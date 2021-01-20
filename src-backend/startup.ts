import { MusicService } from './services/music/music-service';
import { IpcHandlerService } from './api/ipc-handler-service';
import { FileService } from './services/file/file-service';

export function startup() {
  intialiseServices();
}

function intialiseServices() {
  const fileService = new FileService();
  const musicService = new MusicService();
  const ipcHandler = new IpcHandlerService(fileService, musicService);
}