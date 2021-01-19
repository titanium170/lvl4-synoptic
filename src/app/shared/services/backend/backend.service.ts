import { InjectionToken, Injector } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEnvironment } from 'src/environments/ienvironment';
import { ElectronCommsService } from './electron/electron.service';

export enum SupportedBackends {
  electron = 'electron'
}

export interface IBackendService {
  getFile: (path: string) => Observable<File>;
  saveFile: (path: string, file: File) => Observable<void>;
}

export const BACKEND_SERVICE: InjectionToken<IBackendService> = new InjectionToken('empty');

export function backendServiceFactory(): IBackendService {
  if (environment.backend === SupportedBackends.electron) {
    return new ElectronCommsService(new ElectronService());
  }
  throw new Error('Backend value in environment config is not supported!');
}
