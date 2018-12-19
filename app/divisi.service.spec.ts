import { TestBed } from '@angular/core/testing';

import { DivisiService } from './divisi.service';

describe('DivisiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DivisiService = TestBed.get(DivisiService);
    expect(service).toBeTruthy();
  });
});
