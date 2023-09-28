import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobresComponent } from './sobres.component';

describe('SobresComponent', () => {
  let component: SobresComponent;
  let fixture: ComponentFixture<SobresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SobresComponent]
    });
    fixture = TestBed.createComponent(SobresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
