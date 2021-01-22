import { ElectronService } from 'ngx-electron';
import { Observable, Subject } from 'rxjs';
import { FileWithPath, IBackendService } from './../backend.service';
import { Injectable } from '@angular/core';
import { IpcRendererEvent } from 'electron/main';



@Injectable()
export class ElectronCommsService implements IBackendService {

  constructor(private electron: ElectronService) { }

  getFile(path?: string): Observable<FileWithPath> {
    this.electron.ipcRenderer.send('file-request', path);
    const gotFile$: Subject<FileWithPath> = new Subject();
    const errorListener = (event: IpcRendererEvent, err: any) => {
      gotFile$.error(err);
      this.electron.ipcRenderer.removeListener('file-request-err', errorListener);
    };
    this.electron.ipcRenderer.once('file-request-err', errorListener);
    this.electron.ipcRenderer.once('file-response',
      (event: IpcRendererEvent, response: { path: string, content: Buffer }) => {
        if (!path || response.path === path || path === 'appdata') {
          const blob = new Blob([response.content.buffer], { type: 'audio/mpeg' });
          gotFile$.next({ file: blob, path: response.path });
          gotFile$.complete();
        }
        this.electron.ipcRenderer.removeListener('file-request-err', errorListener);
      });
    return gotFile$.asObservable();
  }

  userSelectFiles(): Observable<FileWithPath[]> {
    this.electron.ipcRenderer.send('user-selected-files-request');
    const gotFiles$: Subject<FileWithPath[]> = new Subject();
    this.electron.ipcRenderer.once('user-selected-files-response',
      (event: IpcRendererEvent, response: { path: string, content: Buffer }[]) => {
        const files = [];
        for (const file of response) {
          const blob = new Blob([file.content.buffer], { type: 'audio/mpeg' });
          files.push({ file: blob, path: file.path });
        }
        gotFiles$.next(files);
        gotFiles$.complete();
      });
    return gotFiles$.asObservable();
  }

  saveFile(path: string, file: File | string): Observable<null> {
    if (file instanceof File) {
      file = file as File;
      file.text().then(content => {
        this.electron.ipcRenderer.send('save-file-request', { path, content });
      });
    } else {
      this.electron.ipcRenderer.send('save-file-request', { path, content: file });
    }
    const savedFile$: Subject<null> = new Subject();
    this.electron.ipcRenderer.once('save-file-response', (event: IpcRendererEvent) => {
      savedFile$.next();
    });
    return savedFile$.asObservable();
  }

}

