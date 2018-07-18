import { TestBed, inject } from '@angular/core/testing';

import { DevzendaoService } from './devzendao.service';

describe('DevzendaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevzendaoService]
    });
  });

  it('should be created', inject([DevzendaoService], (service: DevzendaoService) => {
    expect(service).toBeTruthy();
  }));
});
