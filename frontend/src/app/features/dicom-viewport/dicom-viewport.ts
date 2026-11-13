import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { RenderingEngine, Enums, Types, getWebWorkerManager, init as initCornerstone} from '@cornerstonejs/core';
import cornerstoneDICOMImageLoader, { init as initDicomLoader, wadouri } from '@cornerstonejs/dicom-image-loader';

@Component({
  imports: [],
  selector: 'app-dicom-viewport',
  styleUrl: './dicom-viewport.scss',
  templateUrl: './dicom-viewport.html',
})
export class DicomViewport implements OnDestroy {

  @ViewChild('viewport')
  viewportElement!: ElementRef<HTMLDivElement>;

  status = 'Select a DICOM file';

  private engine?: RenderingEngine;
  private initialized = false;

  async loadDicom(event: Event): Promise<void> {

    console.log('loadDicom was called!');

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    console.log('Selected file:', file?.name);

    if (!file) return;

    try {
      this.status = 'Loading DICOM...';

      if (!this.initialized) {
        await initCornerstone();
        await initDicomLoader({ maxWebWorkers: 1 });

        getWebWorkerManager().registerWorker('dicomImageLoader', () => new Worker(new URL('cs-dicom-loader/decodeImageFrameWorker.js', document.baseURI), { type: 'module' }),
      { maxWorkerInstances: 1, overwrite: true});
      
        this.initialized = true;
      }

      const imageId = wadouri.fileManager.add(file);

      if (!this.engine) {
        this.engine = new RenderingEngine('dicom-engine');

        this.engine.enableElement({viewportId: 'ct-stack', type: Enums.ViewportType.STACK, element: this.viewportElement.nativeElement});
      }

      const viewport = this.engine.getViewport('ct-stack') as Types.IStackViewport;

      await viewport.setStack([imageId]);
      viewport.render();

      this.status = file.name;

    } catch (error) {
      console.error(error);
      this.status = 'Unable to display DICOM';
    }
  }

  ngOnDestroy(): void {
      this.engine?.destroy();
  }
}
