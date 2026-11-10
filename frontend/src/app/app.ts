import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {

  fileCount = 0; 
  selectedFileName = 'Ninguno';
  selectedFiles: File[] = [];

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fileCount = input.files?.length ?? 0;
    this.selectedFileName = input.files?.[0]?.name ?? "Ninguno";
    this.selectedFiles = Array.from(input.files ?? []);
  }
}
