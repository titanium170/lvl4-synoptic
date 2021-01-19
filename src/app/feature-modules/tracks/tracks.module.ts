import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracklistPageComponent } from './pages/tracklist-page/tracklist-page.component';


const routes: Route[] = [
  {
    path: '',
    component: TracklistPageComponent
  }
];

@NgModule({
  declarations: [TracklistPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TracksModule { }
