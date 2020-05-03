import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealAccountTransactionsComponent } from './real.account.transactions.component';

describe('RealAccountTransactionComponent', () => {
  let component: RealAccountTransactionsComponent;
  let fixture: ComponentFixture<RealAccountTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealAccountTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealAccountTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
