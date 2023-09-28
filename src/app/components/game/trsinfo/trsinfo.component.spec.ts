import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TRSInfoComponent } from './trsinfo.component';

describe('TRSInfoComponent', () => {
  let component: TRSInfoComponent;
  let fixture: ComponentFixture<TRSInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TRSInfoComponent]
    });
    fixture = TestBed.createComponent(TRSInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
