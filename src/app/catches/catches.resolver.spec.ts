import { TestBed } from '@angular/core/testing';

import { CatchesResolver } from './catches.resolver';

describe('CatchesResolver', () => {
  let resolver: CatchesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CatchesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
