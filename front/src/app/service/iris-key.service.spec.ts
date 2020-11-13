import { TestBed } from '@angular/core/testing';

import { IrisKeyService } from './iris-key.service';

describe('IrisKeyService', () => {
  let service: IrisKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrisKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
