import { TestBed } from '@angular/core/testing';

import { MagnifierService } from './magnifier.service';

describe('MagnifierService', () => {
  let service: MagnifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagnifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
