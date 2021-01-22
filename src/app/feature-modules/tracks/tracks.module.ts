import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracklistPageComponent } from './pages/tracklist-page/tracklist-page.component';
import { TrackComponent } from './components/track/track.component';
import { AddTrackComponent } from './components/add-track/add-track.component';


@NgModule({
  declarations: [TracklistPageComponent, TrackComponent, AddTrackComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  exports: [TrackComponent, AddTrackComponent]
})
export class TracksModule { }
