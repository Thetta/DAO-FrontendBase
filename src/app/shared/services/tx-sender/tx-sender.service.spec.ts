import { TestBed, inject } from '@angular/core/testing';

import { TxSenderService } from './tx-sender.service';

describe('TxSenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TxSenderService]
    });
  });

  it('should be created', inject([TxSenderService], (service: TxSenderService) => {
    expect(service).toBeTruthy();
  }));
});
