import { PlaylistsHomePageComponent } from './feature-modules/playlists/pages/playlists-home-page/playlists-home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistOverviewPageComponent } from './feature-modules/playlists/pages/playlist-overview-page/playlist-overview-page.component';
import { TracklistPageComponent } from './feature-modules/tracks/pages/tracklist-page/tracklist-page.component';

const routes: Routes = [
  {
    path: '',
    component: TracklistPageComponent
  },
  {
    path: 'tracks',
    component: TracklistPageComponent
  },
  {
    path: 'playlists',
    component: PlaylistsHomePageComponent
  },
  {
    path: 'playlists/:id',
    component: PlaylistOverviewPageComponent
  },
  {
    path: '**',
    redirectTo: 'tracks'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
