import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Track } from 'src/app/models/track';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-tracklist-page',
  templateUrl: './tracklist-page.component.html',
  styleUrls: ['./tracklist-page.component.scss']
})
export class TracklistPageComponent implements OnInit {


  public tracks$: Observable<Track[]>;

  constructor(private trackService: TrackService, private title: Title) {
    this.tracks$ = this.trackService.getTracks();
    this.title.setTitle('Your tracks');
  }

  ngOnInit(): void {

  }

}
