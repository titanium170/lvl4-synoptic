import { first } from 'rxjs/operators';
import { QueueManagerService, QueueSettings } from './../queue-manager/queue-manager.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_SERVICE, IBackendService } from './../../../shared/services/backend/backend.service';
import { Howl } from 'howler';
import { Track } from 'src/app/models/track';
import { Queue } from 'src/app/models/queue';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  public get isPlaying$(): Observable<boolean> {
    return this.playing$.asObservable();
  }

  private playing$: ReplaySubject<boolean>;

  private set playing(value: boolean) {
    this.playing$.next(value);
    this._playing = value;
  }
  private get playing(): boolean {
    return this._playing;
  }

  private _playing = false;

  private defaultSongUrl1 = 'C:\\Users\\Robbie\\Documents\\Apprenticeship\\Level 4\\synoptic-project\\synoptic-media-player\\Star Chart.mp3';
  private defaultSongUrl2 = 'C:\\Users\\Robbie\\Documents\\Apprenticeship\\Level 4\\synoptic-project\\synoptic-media-player\\lvl4-synoptic\\src\\assets\\Shiena Nishizawa - The Asterisk War .mp3';

  private howl!: Howl;

  private currentTrack!: Track;

  constructor(
    @Inject(BACKEND_SERVICE) private backend: IBackendService,
    private queue: QueueManagerService
  ) {
    this.playing$ = new ReplaySubject(1);
    this.setDefaults();
    this.trackQueueChanges();
  }

  setDefaults(): void {
    this.playing$.next(false);
    this.queue.replaceQueue(this.getTestingDefaults());
  }

  getTestingDefaults(): Queue {
    return new Queue([
      {
        id: '1',
        name: 'Star Chart',
        artist: 'nano.RIPE',
        album: 'Sankaku EP',
        file: { path: this.defaultSongUrl1, type: 'mp3' }
      },
      {
        id: '2',
        name: 'The Asterisk War',
        artist: 'Shiena Nishizawa',
        album: 'The Asterisk War',
        file: { path: this.defaultSongUrl2, type: 'mp3' }
      }
    ]);
  }

  changeTrack(track: Track): void {
    this.backend.getFile(track.file.path).pipe(first()).subscribe(media => {
      const url = URL.createObjectURL(media);
      this.currentTrack = track;
      if (this.playing) {
        this.howl.stop();
      }
      this.howl = new Howl({
        src: url,
        format: ['mp3'],
        volume: 1
      });
      if (this.playing) {
        this.howl.play();
      }
    });
  }

  play(): void {
    console.log('trying to play');
    if (this.currentTrack && !this.playing) {
      this.playing = true;
      this.howl.play();
      console.log('playing!');
    }

  }

  pause(): void {
    console.log('trying to pause');
    if (this.currentTrack && this.playing) {
      this.playing = false;
      this.howl.pause();
      console.log('paused!');
    }
  }

  next(): void {
    this.queue.next();

  }

  prev(): void {
    this.queue.next();
  }

  toggleShuffle(): void {
    this.queue.config({ shuffle: true } as QueueSettings);
  }

  private trackQueueChanges(): void {
    this.queue.getQueue().subscribe(q => {
      if (q?.length) {
        // probably disables resetting to the beginning of the track with next and previous
        // (in a queue with one track)
        if (!this.currentTrack || q.current?.id !== this.currentTrack.id) {
          this.changeTrack(q.current);
        }
      }
    });
  }

}
