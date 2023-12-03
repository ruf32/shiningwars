import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatindexComponent } from './chatindex.component';

describe('ChatindexComponent', () => {
  let component: ChatindexComponent;
  let fixture: ComponentFixture<ChatindexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatindexComponent]
    });
    fixture = TestBed.createComponent(ChatindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
