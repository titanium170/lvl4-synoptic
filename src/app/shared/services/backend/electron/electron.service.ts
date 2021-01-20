import { ElectronService } from 'ngx-electron';
import { Observable, Subject } from 'rxjs';
import { IBackendService } from './../backend.service';
import { Injectable } from '@angular/core';
import { IpcRendererEvent } from 'electron/main';

@Injectable()
export class ElectronCommsService implements IBackendService {

  constructor(private electron: ElectronService) { }

  getFile(path: string): Observable<File> {
    this.electron.ipcRenderer.send('get-file-request', path);
    const gotFile$: Subject<File> = new Subject();
    this.electron.ipcRenderer.once('got-file-response', (event: IpcRendererEvent, file: File) => {
      gotFile$.next(file);
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
