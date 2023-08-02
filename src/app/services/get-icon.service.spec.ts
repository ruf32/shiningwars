import { TestBed } from '@angular/core/testing';

import { GetIconService } from './get-icon.service';

describe('GetIconService', () => {
  let service: GetIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
