import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsHomePageComponent } from './pages/playlists-home-page/playlists-home-page.component';
import { PlaylistOverviewPageComponent } from './pages/playlist-overview-page/playlist-overview-page.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistTracklistComponent } from './components/playlist-tracklist/playlist-tracklist.component';


const routes: Route[] = [
  {
    path: '',
    component: PlaylistsHomePageComponent
  },
  {
    path: ':id',
    component: PlaylistOverviewPageComponent
  }
];


@NgModule({
  declarations: [PlaylistsHomePageComponent, PlaylistOverviewPageComponent, PlaylistComponent, PlaylistTracklistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PlaylistsModule { }
