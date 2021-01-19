/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElectronCommsService } from './electron.service';

describe('Service: Electron', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectronCommsService]
    });
  });

  it('should ...', inject([ElectronCommsService], (service: ElectronCommsService) => {
    expect(service).toBeTruthy();
  }));
});
