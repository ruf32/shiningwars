import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Popup2Component } from './popup2.component';

describe('Popup2Component', () => {
  let component: Popup2Component;
  let fixture: ComponentFixture<Popup2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Popup2Component]
    });
    fixture = TestBed.createComponent(Popup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
