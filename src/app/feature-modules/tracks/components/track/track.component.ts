import { MusicPlayerService } from './../../../../core/services/music-player/music-player.service';
import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/feature-modules/playlists/services/playlist/playlist.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input() track!: Track;
  @Input() active = false;
  @Input()
  set playlists(val: Playlist[] | null) {
    if (val) {
      this._playlists = [...val];
      this._playlists.forEach(p => {
        if (p.tracks.map((t: any) => t.id).includes(this.track.id)) {
          this.disabledPlaylists.push(p.id);
        }
      });
    }
  }
  get playlists(): Playlist[] | null {
    return this._playlists;
  }

  public disabledPlaylists: string[] = [];

  private _playlists: any[] = [];

  constructor(private player: MusicPlayerService, private playlistService: PlaylistService) { }

  ngOnInit(): void {

  }

  playTrack(): void {
    this.player.changeTrack(this.track, true);
  }

  addToPlaylist(playlist: Playlist): void {
    this.disabledPlaylists.push(playlist.id);
    this.playlistService.addTrackToPlaylist(playlist.id, this.track).subscribe();
  }
}
