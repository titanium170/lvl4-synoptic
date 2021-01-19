import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tracks',
    loadChildren: () => import('./feature-modules/tracks/tracks.module').then(m => m.TracksModule)
  },
  {
    path: 'playlists',
    loadChildren: () => import('./feature-modules/playlists/playlists.module').then(m => m.PlaylistsModule)
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
