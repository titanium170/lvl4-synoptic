import { ElectronService } from 'ngx-electron';
import { Observable, Subject } from 'rxjs';
import { IBackendService, MediaDataFile } from './../backend.service';
import { Injectable } from '@angular/core';
import { IpcRendererEvent } from 'electron/main';
import { IAudioMetadata } from 'music-metadata';

export interface MatchedFile {
  path: string;
  content: string;
  metadata: IAudioMetadata;
}

@Injectable()
export class ElectronCommsService implements IBackendService {

  constructor(private electron: ElectronService) { }

  getFile(path?: string): Observable<MediaDataFile> {
    this.electron.ipcRenderer.send('get-file-request', path);
    const gotFile$: Subject<MediaDataFile> = new Subject();
    this.electron.ipcRenderer.once('got-file-response', (event: IpcRendererEvent, file: MatchedFile) => {
      if (!path || file.path === path) {
        const blob = new Blob([file.content], { type: 'audio/mpeg' });
        gotFile$.next({ ...file, content: blob });
      }
    });
    return gotFile$.asObservable();
  }

  userSelectFiles(): Observable<MediaDataFile[]> {
    this.electron.ipcRenderer.send('get-user-selected-files-request');
    const gotFiles$: Subject<MediaDataFile[]> = new Subject();
    this.electron.ipcRenderer.once('got-user-selected-files-response',
      (event: IpcRendererEvent, files: MatchedFile[]) => {
        const mediaFiles: MediaDataFile[] = [];
        for (const file of files) {
          const blob = new Blob([file.content], { type: 'audio/mpeg' });
          mediaFiles.push({ ...file, content: blob });
        }
        gotFiles$.next(mediaFiles);
      });
    return gotFiles$.asObservable();
  }

  saveFile(path: string, file: File): Observable<void> {
    this.electron.ipcRenderer.send('save-file', { path, file });
    const savedFile$: Subject<void> = new Subject();
    this.electron.ipcRenderer.once('got-file', (event: IpcRendererEvent) => {
      savedFile$.next();
    });
    return savedFile$.asObservable();
  }

}
