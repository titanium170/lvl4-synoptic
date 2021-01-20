/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MusicPlayerService } from './music-player.service';

describe('Service: MusicPlayer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicPlayerService]
    });
  });

  it('should ...', inject([MusicPlayerService], (service: MusicPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
