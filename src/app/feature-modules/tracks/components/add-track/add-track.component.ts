import { PlaylistService } from 'src/app/feature-modules/playlists/services/playlist/playlist.service';
import { QueueManagerService } from './../../../../core/services/queue-manager/queue-manager.service';
import { TrackService } from './../../services/track.service';
import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/models/queue';
import { Playlist } from 'src/app/models/playlist';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.scss']
})
export class AddTrackComponent implements OnInit {

  @Input() playlist!: Playlist;

  constructor(
    private trackService: TrackService,
    private queue: QueueManagerService,
    private playlistService: PlaylistService) { }

  ngOnInit(): void {
  }

  add(): void {
    this.trackService.addTracks().subscribe(tracks => {
      for (const track of tracks) {
        this.queue.add(track);
        if (this.playlist) {
          this.playlistService.addTrackToPlaylist(this.playlist.id, track).pipe(first()).subscribe();
          // hack
          window.location.reload();
        }
      }
    });
  }

}
