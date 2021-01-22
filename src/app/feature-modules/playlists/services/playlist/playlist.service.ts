import { LocalStoreService } from './../../../../shared/services/database/local/local-store.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlaylistDialogComponent } from '../../components/add-playlist-dialog/add-playlist-dialog.component';
import { Playlist } from 'src/app/models/playlist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {


  constructor(public dialog: MatDialog, private store: LocalStoreService) { }

  public getPlaylists(): Observable<Playlist[]> {
    return this.store.getPlaylists();
  }

  public addPlaylist(): void {
    const dialogRef = this.dialog.open(AddPlaylistDialogComponent, { width: '250px' });
    dialogRef.afterClosed().subscribe(playlistName => {
      const playlist = new Playlist(playlistName, []);
      this.store.savePlaylists([playlist]);
    });
  }
}
