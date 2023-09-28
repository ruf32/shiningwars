import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatllenetComponent } from './batllenet.component';

describe('BatllenetComponent', () => {
  let component: BatllenetComponent;
  let fixture: ComponentFixture<BatllenetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatllenetComponent]
    });
    fixture = TestBed.createComponent(BatllenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
