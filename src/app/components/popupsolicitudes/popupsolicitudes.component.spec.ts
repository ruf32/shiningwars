import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupsolicitudesComponent } from './popupsolicitudes.component';

describe('PopupsolicitudesComponent', () => {
  let component: PopupsolicitudesComponent;
  let fixture: ComponentFixture<PopupsolicitudesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupsolicitudesComponent]
    });
    fixture = TestBed.createComponent(PopupsolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
