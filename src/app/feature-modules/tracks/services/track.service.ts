import { IMediaFile } from './../../../models/media-file';
import { BACKEND_SERVICE, IBackendService, MediaDataFile } from './../../../shared/services/backend/backend.service';
import { Inject, Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Track } from 'src/app/models/track';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private defaultSongUrl1 = 'C:\\Users\\Robbie\\Documents\\Apprenticeship\\Level 4\\synoptic-project\\synoptic-media-player\\Star Chart.mp3';
  private defaultSongUrl2 = 'C:\\Users\\Robbie\\Documents\\Apprenticeship\\Level 4\\synoptic-project\\synoptic-media-player\\lvl4-synoptic\\src\\assets\\Shiena Nishizawa - The Asterisk War .mp3';

  constructor(@Inject(BACKEND_SERVICE) private backend: IBackendService) { }

  public getTracks(): Observable<Track[]> {
    return of([
      {
        id: '1',
        name: 'Star Chart',
        artist: 'nano.RIPE',
        album: 'Sankaku EP',
        duration: 276,
        file: { path: this.defaultSongUrl1, type: 'mp3' }
      },
      {
        id: '2',
        name: 'The Asterisk War',
        artist: 'Shiena Nishizawa',
        album: 'The Asterisk War',
        duration: 207,
        file: { path: this.defaultSongUrl2, type: 'mp3' }
      }
    ]);
  }

  public addTracks(): Observable<Track[]> {
    return this.backend.userSelectFiles().pipe(map(files => {
      const tracks: Track[] = [];
      for (const file of files) {
        tracks.push(this.parseMediaDataFile(file));
      }
      return tracks;
    }));
  }

  private parseMediaDataFile(media: MediaDataFile): Track {
    const tags = media.metadata.common;
    const mediaFile: IMediaFile = { path: media.path, type: 'mp3' };
    const duration = Math.round(media.metadata.format.duration ?? 0);
    return new Track(tags.title as string, tags.artist as string, tags.album as string, mediaFile, duration);
  }

}