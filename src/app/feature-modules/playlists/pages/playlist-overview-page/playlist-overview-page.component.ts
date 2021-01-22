import { PlaylistService } from 'src/app/feature-modules/playlists/services/playlist/playlist.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist';

@Component({
  selector: 'app-playlist-overview-page',
  templateUrl: './playlist-overview-page.component.html',
  styleUrls: ['./playlist-overview-page.component.scss']
})
export class PlaylistOverviewPageComponent implements OnInit {

  public playlist!: Playlist;

  constructor(
    private route: ActivatedRoute,
    title: Title,
    private playlistService: PlaylistService) {
    this.route.params.pipe(switchMap((params: any) => {
      return this.playlistService.getPlaylists().pipe(map(playlists => playlists.find(p => p.id === params?.id)));
    })).subscribe(playlist => {
      if (playlist) {
        this.playlist = playlist;
        title.setTitle('Playlist: ' + playlist?.name);
      }
    });
  }

  ngOnInit(): void {
  }

}
