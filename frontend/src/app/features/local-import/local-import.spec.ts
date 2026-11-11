import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalImport } from './local-import';

describe('LocalImport', () => {
  let component: LocalImport;
  let fixture: ComponentFixture<LocalImport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalImport],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalImport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
