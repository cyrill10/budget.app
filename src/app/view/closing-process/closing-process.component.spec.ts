import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingProcessComponent } from './closing-process.component';

describe('ClosingProcessComponent', () => {
  let component: ClosingProcessComponent;
  let fixture: ComponentFixture<ClosingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClosingProcessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
