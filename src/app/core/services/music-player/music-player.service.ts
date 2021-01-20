import { QueueManagerService } from './../queue-manager/queue-manager.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_SERVICE, IBackendService } from './../../../shared/services/backend/backend.service';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  public get isPlaying$(): Observable<boolean> {
    return this.playing$.asObservable();
  }

  private playing$: ReplaySubject<boolean>;

  private defaultSongUrl = 'C:\\Users\\Robbie\\Documents\\Apprenticeship\\Level 4\\synoptic-project\\synoptic-media-player\\Star Chart.mp3';

  private howl!: Howl;

  private set playing(value: boolean) {
    this.playing$.next(value);
    this._playing = value;
  }
  private get playing(): boolean {
    return this._playing;
  }

  private _playing = false;

  constructor(
    @Inject(BACKEND_SERVICE) private backend: IBackendService,
    private queue: QueueManagerService
  ) {
    this.playing$ = new ReplaySubject(1);
    this.setDefaults();

  }

  setDefaults(): void {
    this.playing$.next(false);
    this.queue.
      this.getDefaultSong();
  }

  getDefaultSong(): void {
    this.backend.getFile(this.defaultSongUrl).subscribe((m: any) => {
      const audioFile = new Blob([m.content], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(audioFile);
      this.howl = new Howl({
        src: url,
        format: ['mp3'],
        volume: 1
      });
    });
  }

  play(): void {
    if (!this.playing) {
      this.playing = true;
      this.howl.play();
    }

  }

  pause(): void {
    if (this.playing) {
      this.playing = false;
      this.howl.pause();
    }
  }

  next(): void {
    // TODO
  }

  prev(): void {
    // TODO 
  }

}
