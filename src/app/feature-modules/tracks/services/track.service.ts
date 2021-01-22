import { LocalStoreService } from './../../../shared/services/database/local/local-store.service';
import { IMediaFile, MediaFileData } from './../../../models/media-file';
import { BACKEND_SERVICE, IBackendService } from './../../../shared/services/backend/backend.service';
import { Inject, Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Track } from 'src/app/models/track';
import { map, switchMap } from 'rxjs/operators';
import { MediaService } from 'src/app/shared/services/media/media.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private mediaService: MediaService, private store: LocalStoreService) { }

  public getTracks(): Observable<Track[]> {
    return this.store.getTracks();
  }

  public addTracks(): Observable<Track[]> {
    return this.mediaService.getUserSelectedMedia().pipe(switchMap(files => {
      const tracks: Track[] = [];
      for (const file of files) {
        tracks.push(this.parseMediaFileData(file));
      }
      return this.store.saveTracks(tracks);
    }));
  }

  private parseMediaFileData(media: MediaFileData): Track {
    const tags = media.metadata.common;
    const mediaFile: IMediaFile = { path: media.path, type: 'mp3' };
    const duration = Math.round(media.metadata.format.duration ?? 0);
    return new Track(tags.title as string, tags.artist as string, tags.album as string, mediaFile, duration);
  }

}
