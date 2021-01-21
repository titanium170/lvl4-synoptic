import { filter, first, map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { QueueManagerService, QueueSettings } from './../queue-manager/queue-manager.service';
import { interval, Observable, ReplaySubject, Subject } from 'rxjs';
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

  private position$!: Observable<number>;

  private currentTrack$: ReplaySubject<Track>;

  private set currentTrack(track: Track) {
    this.currentTrack$.next(track);
    this._currentTrack = track;
  }
  private get currentTrack(): Track {
    return this._currentTrack;
  }

  private _currentTrack!: Track;


  private defaultSongUrl1 = 'C:\\Users\\Robbie\\Documents\\Apprenticeship\\Level 4\\synoptic-project\\synoptic-media-player\\Star Chart.mp3';
  private defaultSongUrl2 = 'C:\\Users\\Robbie\\Documents\\Apprenticeship\\Level 4\\synoptic-project\\synoptic-media-player\\lvl4-synoptic\\src\\assets\\Shiena Nishizawa - The Asterisk War .mp3';

  private howl!: Howl;

  private volume: number = 100;

  constructor(
    @Inject(BACKEND_SERVICE) private backend: IBackendService,
    private queue: QueueManagerService
  ) {
    this.playing$ = new ReplaySubject(1);
    this.currentTrack$ = new ReplaySubject(1);
    this.setDefaults();
    this.trackQueueChanges();
    this.trackPosition();
  }


  public getCurrentTrack(): Observable<Track> {
    return this.currentTrack$.asObservable();
  }

  public getPosition(): Observable<number> {
    return this.position$;
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
        duration: 276,
        file: { path: this.defaultSongUrl1, type: 'mp3' }
      },
      {
        id: '2',
        name: 'The Asterisk War',
        artist: 'Shiena Nishizawa',
        album: 'The Asterisk War',
        duration: 207,
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
        volume: this.volume / 100
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

  // doesn't update UI
  changeVolume(vol: number): void {
    this.volume = vol;
    this.howl.volume(vol / 100);
  }

  private trackPosition(): void {
    this.position$ = interval(200).pipe(
      map(() => this.howl.seek() as number),
      filter(() => this.playing));
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
