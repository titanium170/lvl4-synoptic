import { LocalStoreService } from './../../../../shared/services/database/local/local-store.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlaylistDialogComponent } from '../../components/add-playlist-dialog/add-playlist-dialog.component';
import { Playlist } from 'src/app/models/playlist';
import { EMPTY, Observable, Subject, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Track } from 'src/app/models/track';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private addedPlaylists$: Subject<Playlist[]>;

  constructor(public dialog: MatDialog, private store: LocalStoreService) {
    this.addedPlaylists$ = new Subject();
  }

  public addedPlaylists(): Observable<Playlist[]> {
    return this.addedPlaylists$.asObservable();
  }

  public getPlaylists(): Observable<Playlist[]> {
    return this.store.getPlaylists();
  }

  public addPlaylist(): Observable<Playlist[]> {
    const dialogRef = this.dialog.open(AddPlaylistDialogComponent, { width: '250px' });
    return dialogRef.afterClosed().pipe(switchMap(playlistName => {
      if (playlistName) {
        const playlist = new Playlist(playlistName, []);
        return this.store.savePlaylists([playlist])
          .pipe(tap(playlists => this.addedPlaylists$.next(playlists)));
      }
      return EMPTY;
    }));
  }

  public addTrackToPlaylist(playlistId: string, track: Track): Observable<Playlist> {
    return this.getPlaylists().pipe(switchMap(playlists => {
      const playlist = playlists.find(p => p.id === playlistId);
      if (!playlist) {
        return throwError('Playlist not found');
      }
      if (!playlist?.tracks.map(t => t.id).includes(track.id)) {
        playlist?.tracks.push(track);
      }
      return this.store.savePlaylists([playlist]).pipe(map(p => p[0]));
    }));
  }

  public getPlaylistTracks(playlistId: string): Observable<Track[]> {
    return this.store.getPlaylists().pipe(
      map(playlists => playlists.find(p => p.id === playlistId)?.tracks ?? [])
    );
  }
}
