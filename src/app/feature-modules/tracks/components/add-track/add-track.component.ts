import { QueueManagerService } from './../../../../core/services/queue-manager/queue-manager.service';
import { TrackService } from './../../services/track.service';
import { Component, OnInit } from '@angular/core';
import { Queue } from 'src/app/models/queue';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.scss']
})
export class AddTrackComponent implements OnInit {

  constructor(private trackService: TrackService, private queue: QueueManagerService) { }

  ngOnInit(): void {
  }

  add(): void {
    this.trackService.addTracks().subscribe(tracks => {
      console.log('parsed: ', tracks);
      this.queue.replaceQueue(new Queue(tracks));
    });
  }

}
