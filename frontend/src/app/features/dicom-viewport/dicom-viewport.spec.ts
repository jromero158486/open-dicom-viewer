import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DicomViewport } from './dicom-viewport';

describe('DicomViewport', () => {
  let component: DicomViewport;
  let fixture: ComponentFixture<DicomViewport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DicomViewport],
    }).compileComponents();

    fixture = TestBed.createComponent(DicomViewport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
