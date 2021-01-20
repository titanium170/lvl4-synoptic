import { Observable } from 'rxjs';
import { MusicPlayerService } from './../../services/music-player/music-player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  public playing$: Observable<boolean>;

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

}
