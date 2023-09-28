import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TRSInvComponent } from './trsinv.component';

describe('TRSInvComponent', () => {
  let component: TRSInvComponent;
  let fixture: ComponentFixture<TRSInvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TRSInvComponent]
    });
    fixture = TestBed.createComponent(TRSInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
