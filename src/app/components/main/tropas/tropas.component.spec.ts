import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TropasComponent } from './tropas.component';

describe('TropasComponent', () => {
  let component: TropasComponent;
  let fixture: ComponentFixture<TropasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TropasComponent]
    });
    fixture = TestBed.createComponent(TropasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
