import { Observable } from 'rxjs';
import { MusicPlayerService } from './../../services/music-player/music-player.service';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  public playing$: Observable<boolean>;
  public shuffleToggled = false;
  public volume = 100;

  constructor(private playerService: MusicPlayerService) {
    this.playing$ = this.playerService.isPlaying$;
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
  }

}
