import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-playlist-dialog',
  templateUrl: './add-playlist-dialog.component.html',
  styleUrls: ['./add-playlist-dialog.component.scss']
})
export class AddPlaylistDialogComponent implements OnInit {

  public playlistName = '';

  constructor(public dialogRef: MatDialogRef<AddPlaylistDialogComponent>) { }

  ngOnInit(): void {
  }

}
