import { Component, signal } from '@angular/core';
import { LocalImport } from './features/local-import/local-import';

@Component({
  imports: [LocalImport],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
}
