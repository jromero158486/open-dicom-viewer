import { Component, signal } from '@angular/core';
import { LocalImport } from './features/local-import/local-import';
import { DicomViewport } from './features/dicom-viewport/dicom-viewport';

@Component({
  imports: [LocalImport, DicomViewport],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
}
