import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input() track!: Track;
  @Input() active = false;

  constructor() { }

  ngOnInit(): void {
  }

  showOptions(): void {

  }

}
