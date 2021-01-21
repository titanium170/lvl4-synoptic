/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStoreService } from './local-store.service';

describe('Service: LocalStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStoreService]
    });
  });

  it('should ...', inject([LocalStoreService], (service: LocalStoreService) => {
    expect(service).toBeTruthy();
  }));
});
