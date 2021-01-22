import { MusicPlayerService } from './../../../../core/services/music-player/music-player.service';
import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input() track!: Track;
  @Input() active = false;

  constructor(private player: MusicPlayerService) { }

  ngOnInit(): void {
  }

  showOptions(): void {

  }

  playTrack(): void {
    this.player.changeTrack(this.track, true);
  }
}
