import { Component } from '@angular/core';
import { DicomFileInfo } from '../../models/dicom-file-info';

@Component({
  imports: [],
  selector: 'app-local-import',
  styleUrl: './local-import.scss',
  templateUrl: './local-import.html',
})
export class LocalImport {
  fileCount = 0; 
  selectedFileName = 'Ninguno';
  selectedFiles: DicomFileInfo[] = [];

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    this.selectedFiles = files.map(file => ({
      file: file,
      name: file.name,
      sizeKB: Math.round(file.size / 1024 * 10) / 10,
      lastModified: new Date(file.lastModified)
    }));

    this.fileCount = this.selectedFiles.length;

    this.selectedFileName = this.selectedFiles[0].name ?? 'Ninguno';
  }
}
