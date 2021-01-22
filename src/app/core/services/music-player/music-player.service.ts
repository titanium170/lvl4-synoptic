import { MediaService } from './../../../shared/services/media/media.service';
import { filter, first, map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { QueueManagerService, QueueSettings } from './../queue-manager/queue-manager.service';
import { interval, Observable, ReplaySubject, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_SERVICE, IBackendService } from './../../../shared/services/backend/backend.service';
import { Howl } from 'howler';
import { Track } from 'src/app/models/track';
import { Queue } from 'src/app/models/queue';
import { TrackService } from 'src/app/feature-modules/tracks/services/track.service';

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


  private howl!: Howl;

  private volume: number = 100;

  constructor(
    private mediaService: MediaService,
    private queue: QueueManagerService,
    private trackService: TrackService
  ) {
    this.playing$ = new ReplaySubject(1);
    this.currentTrack$ = new ReplaySubject(1);
    this.setDefaults();
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
    this.trackService.getTracks().subscribe(tracks => {
      this.queue.replaceQueue(new Queue(tracks));
      this.trackQueueChanges();
    });
  }

  changeTrack(track: Track, playImmediately = false): void {
    this.mediaService.getMediaFile(track.file.path).pipe(first()).subscribe(media => {
      const url = URL.createObjectURL(media.content);
      this.currentTrack = track;
      if (this.playing) {
        this.howl.unload();
      }
      this.howl = new Howl({
        src: url,
        format: ['mp3'],
        volume: this.volume / 100
      });
      if (this.playing) {
        this.howl.play();
      } else if (playImmediately) {
        this.play();
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
    this.queue.config({ shuffle: !this.queue.config().shuffle } as QueueSettings);
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
