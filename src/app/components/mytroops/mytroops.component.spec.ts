import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytroopsComponent } from './mytroops.component';

describe('MytroopsComponent', () => {
  let component: MytroopsComponent;
  let fixture: ComponentFixture<MytroopsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MytroopsComponent]
    });
    fixture = TestBed.createComponent(MytroopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
