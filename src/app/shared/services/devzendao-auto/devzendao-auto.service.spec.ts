import { TestBed, inject } from '@angular/core/testing';

import { DevzendaoAutoService } from './devzendao-auto.service';

describe('DevzendaoAutoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevzendaoAutoService]
    });
  });

  it('should be created', inject([DevzendaoAutoService], (service: DevzendaoAutoService) => {
    expect(service).toBeTruthy();
  }));
});
