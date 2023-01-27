import { TestBed } from '@angular/core/testing';

import { CatchesService } from './catches.service';

describe('CatchesService', () => {
  let service: CatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
