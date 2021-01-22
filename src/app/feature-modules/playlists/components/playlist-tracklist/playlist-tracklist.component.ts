import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist';
import { Track } from 'src/app/models/track';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlist-tracklist',
  templateUrl: './playlist-tracklist.component.html',
  styleUrls: ['./playlist-tracklist.component.scss']
})
export class PlaylistTracklistComponent implements OnInit {

  public tracks$!: Observable<Track[]>;
  public playlists$!: Observable<Playlist[]>;

  constructor(private playlistService: PlaylistService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.tracks$ = this.playlistService.getPlaylistTracks(params.id);
      this.playlists$ = this.playlistService.getPlaylists().pipe(
        map(playlists => playlists.filter(p => p.id !== params.id)),
        shareReplay(1));
    });

  }

  ngOnInit(): void {

  }

}
