import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { PlaylistService } from './../../services/playlist/playlist.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-playlists-home-page',
  templateUrl: './playlists-home-page.component.html',
  styleUrls: ['./playlists-home-page.component.scss']
})
export class PlaylistsHomePageComponent implements OnInit, OnDestroy {

  public playlists$: Observable<Playlist[]>;
  public sub: Subscription;

  constructor(private playlistService: PlaylistService, title: Title) {
    title.setTitle('Your playlists');
    this.playlists$ = this.playlistService.getPlaylists();
    this.sub = this.playlistService.addedPlaylists().subscribe(playlists => {
      this.playlists$ = this.playlistService.getPlaylists();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
