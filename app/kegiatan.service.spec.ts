import { TestBed } from '@angular/core/testing';

import { KegiatanService } from './kegiatan.service';

describe('KegiatanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KegiatanService = TestBed.get(KegiatanService);
    expect(service).toBeTruthy();
  });
});
