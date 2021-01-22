import { TracksModule } from './../tracks/tracks.module';
import { MatButtonModule } from '@angular/material/button';
import { PlaylistService } from './services/playlist/playlist.service';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsHomePageComponent } from './pages/playlists-home-page/playlists-home-page.component';
import { PlaylistOverviewPageComponent } from './pages/playlist-overview-page/playlist-overview-page.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistTracklistComponent } from './components/playlist-tracklist/playlist-tracklist.component';

import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { AddPlaylistDialogComponent } from './components/add-playlist-dialog/add-playlist-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlaylistsHomePageComponent,
    PlaylistOverviewPageComponent,
    PlaylistComponent,
    PlaylistTracklistComponent,
    AddPlaylistComponent,
    AddPlaylistDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    TracksModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    MatDialog,
    PlaylistService
  ]
})
export class PlaylistsModule { }
