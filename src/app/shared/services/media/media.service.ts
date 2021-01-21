
import { IAudioMetadata, parseBlob } from 'music-metadata-browser';
import { BACKEND_SERVICE, IBackendService, FileWithPath } from './../backend/backend.service';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MediaFileData } from 'src/app/models/media-file';
import { zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(@Inject(BACKEND_SERVICE) private backend: IBackendService) { }

  getMediaFile(path: string): Observable<MediaFileData> {
    return this.backend.getFile(path).pipe(switchMap(file => this.addMetadata(file)));
  }

  getUserSelectedMedia(): Observable<MediaFileData[]> {
    return this.backend.userSelectFiles().pipe(switchMap(files => {
      const mediaFiles: Observable<MediaFileData>[] = [];
      for (const file of files) {
        mediaFiles.push(this.addMetadata(file));
      }
      return zip(...mediaFiles);
    }));
  }

  addMetadata(file: FileWithPath): Observable<MediaFileData> {
    return this.getMetadata(file.file as Blob).pipe(map(metadata => {
      return { path: file.path, type: 'mp3', content: file.file as File, metadata };
    }));
  }

  getMetadata(file: Blob): Observable<IAudioMetadata> {
    return from(parseBlob(file));
  }

}
