import { environment } from './../../../../../environments/environment';
import { BACKEND_SERVICE, IBackendService } from './../../backend/backend.service';
import { Inject, Injectable } from '@angular/core';
import { MediaFile } from 'src/app/models/media-file';
import { Track } from 'src/app/models/track';
import { Playlist } from 'src/app/models/playlist';
import { from, Observable, ReplaySubject } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

export interface LocalStore {
  tracks: Track[];
  playlists: Playlist[];
}

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {


  private onReady$: ReplaySubject<null>;
  private store!: LocalStore;

  constructor(@Inject(BACKEND_SERVICE) private backend: IBackendService) {
    this.onReady$ = new ReplaySubject(1);
    this.getStore().pipe(first()).subscribe(store => {
      if (!store) {
        store = { tracks: [], playlists: [] } as LocalStore;
      }
      this.store = store;
      this.onReady$.next();
    }, err => {
      this.store = { tracks: [], playlists: [] } as LocalStore;
      this.onReady$.next();
    });
  }

  public onReady(): Observable<null> {
    return this.onReady$.asObservable();
  }

  public getTracks(): Observable<Track[]> {
    return this.onReady().pipe(map(() => {
      return this.store.tracks;
    }));
  }

  public getPlaylists(): Observable<Playlist[]> {
    return this.onReady().pipe(map(() => this.store.playlists));
  }

  public saveTracks(tracks: Track[]): Observable<Track[]> {
    return this.onReady().pipe(switchMap(() => {
      for (const track of tracks) {
        if (!this.store.tracks.map(t => t.id).includes(track.id)) {
          this.store.tracks.push(track);
        }
      }
      return this.saveStore().pipe(map(() => tracks));
    }));
  }

  public savePlaylists(playlists: Playlist[]): Observable<Playlist[]> {
    return this.onReady().pipe(switchMap(() => {
      for (const playlist of playlists) {
        const existingPlaylistIndex = this.store.playlists.map(p => p.id).indexOf(playlist.id);
        if (existingPlaylistIndex === -1) {
          this.store.playlists.push(playlist);
        } else {
          this.store.playlists[existingPlaylistIndex] = playlist;
        }
      }
      return this.saveStore().pipe(map(() => playlists));
    }));
  }


  private getStore(): Observable<LocalStore> {
    return this.backend.getFile('appdata').pipe(switchMap(store => {
      return from((store.file as File).text()).pipe(map(text => {
        return JSON.parse(text);
      }));
    }
    ));
  }

  private saveStore(): Observable<null> {
    if (!this.store) {
      this.store = { tracks: [], playlists: [] } as LocalStore;
    }
    return this.backend.saveFile('appdata', JSON.stringify(this.store));
  }

}
