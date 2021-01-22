import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.scss']
})
export class AddPlaylistComponent implements OnInit {

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
  }

  add(): void {
    this.playlistService.addPlaylist().subscribe();
  }
}
