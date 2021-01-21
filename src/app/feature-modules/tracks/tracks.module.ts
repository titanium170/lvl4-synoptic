import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracklistPageComponent } from './pages/tracklist-page/tracklist-page.component';
import { TrackComponent } from './components/track/track.component';
import { AddTrackComponent } from './components/add-track/add-track.component';


const routes: Route[] = [
  {
    path: '',
    component: TracklistPageComponent
  }
];

@NgModule({
  declarations: [TracklistPageComponent, TrackComponent, AddTrackComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule
  ]
})
export class TracksModule { }
