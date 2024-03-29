import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter, sortBy } from 'lodash-es';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { PlaylistService } from 'src/app/feature-modules/playlists/services/playlist/playlist.service';
import { Playlist } from 'src/app/models/playlist';
import { Track } from 'src/app/models/track';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-tracklist-page',
  templateUrl: './tracklist-page.component.html',
  styleUrls: ['./tracklist-page.component.scss']
})
export class TracklistPageComponent implements OnInit, OnDestroy {


  public tracks$: Observable<Track[]>;
  public playlists$: Observable<Playlist[]>;
  private subs: Subscription[] = [];

  constructor(
    private trackService: TrackService,
    private title: Title,
    private menu: MenuService,
    private playlistService: PlaylistService) {
    this.tracks$ = this.trackService.getTracks().pipe(tap(t => console.log('got tracks in tracklist', t)));
    this.playlists$ = this.playlistService.getPlaylists().pipe(shareReplay(1));
    this.title.setTitle('Your tracks');
    this.subs.push(this.menu.onSort().subscribe(value => this.sort(value)));
    this.subs.push(this.menu.onSearch().subscribe(value => this.search(value)));
  }

  ngOnInit(): void {

  }

  sort(value: string): void {
    this.tracks$ = this.tracks$.pipe(
      map(tracks => sortBy(tracks, (t) => value === 'az' ? t.name : t.album))
    );
  }

  search(value: string): void {
    this.tracks$ = this.trackService.getTracks().pipe(
      map(tracks => filter(tracks, (t) => (t.name + t.album + t.artist).toLowerCase().includes(value.toLowerCase()))));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
