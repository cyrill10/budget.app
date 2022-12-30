import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VirtualAccountTransactionsComponent } from './virtual.account.transactions.component';

describe('VirtualAccountTransactionComponent', () => {
  let component: VirtualAccountTransactionsComponent;
  let fixture: ComponentFixture<VirtualAccountTransactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VirtualAccountTransactionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualAccountTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
