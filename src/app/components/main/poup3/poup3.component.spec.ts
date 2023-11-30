import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poup3Component } from './poup3.component';

describe('Poup3Component', () => {
  let component: Poup3Component;
  let fixture: ComponentFixture<Poup3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Poup3Component]
    });
    fixture = TestBed.createComponent(Poup3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
