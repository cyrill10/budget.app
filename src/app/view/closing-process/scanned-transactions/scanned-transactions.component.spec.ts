import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedTransactionsComponent } from './scanned-transactions.component';

describe('ScannedTransactionsComponent', () => {
  let component: ScannedTransactionsComponent;
  let fixture: ComponentFixture<ScannedTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
