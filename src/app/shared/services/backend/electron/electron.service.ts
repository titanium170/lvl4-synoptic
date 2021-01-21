import { ElectronService } from 'ngx-electron';
import { Observable, Subject } from 'rxjs';
import { IBackendService } from './../backend.service';
import { Injectable } from '@angular/core';
import { IpcRendererEvent } from 'electron/main';

export interface MatchedFile {
  path: string;
  content: string;
}

@Injectable()
export class ElectronCommsService implements IBackendService {

  constructor(private electron: ElectronService) { }

  getFile(path: string): Observable<Blob> {
    this.electron.ipcRenderer.send('get-file-request', path);
    const gotFile$: Subject<Blob> = new Subject();
    this.electron.ipcRenderer.once('got-file-response', (event: IpcRendererEvent, file: MatchedFile) => {
      console.log('got file');
      if (!path || file.path === path) {
        const mediaFile = new Blob([file.content], { type: 'audio/mpeg' });
        gotFile$.next(mediaFile);
      }
    });
    return gotFile$.asObservable();
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
