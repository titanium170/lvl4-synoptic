import { Observable, zip } from 'rxjs';
import { MusicPlayerService } from './../../services/music-player/music-player.service';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Track } from 'src/app/models/track';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  public playing$: Observable<boolean>;
  public currentTrack$: Observable<Track>;
  public currentPos$: Observable<number>;
  public positionPercentage$: Observable<number>;
  public shuffleToggled = false;
  public volume = 100;

  constructor(private playerService: MusicPlayerService, private cd: ChangeDetectorRef) {
    this.playing$ = this.playerService.isPlaying$;
    this.currentTrack$ = this.playerService.getCurrentTrack();
    this.currentPos$ = this.playerService.getPosition();
    this.positionPercentage$ = this.currentTrack$.pipe(switchMap(track => {
      return this.currentPos$.pipe(
        map(pos => (pos / (track.duration ?? 0)) * 100),
        tap(() => cd.detectChanges()));
    }));
  }


  ngOnInit(): void {

  }


  play(): void {
    this.playerService.play();
  }

  pause(): void {
    this.playerService.pause();
  }

  next(): void {
    this.playerService.next();
  }

  prev(): void {
    this.playerService.prev();
  }

  toggleShuffle(): void {
    this.playerService.toggleShuffle();
    this.shuffleToggled = !this.shuffleToggled;
  }

  changeVolume(change: MatSliderChange): void {
    this.volume = change.value ?? this.volume;
    this.playerService.changeVolume(this.volume);
  }

}
