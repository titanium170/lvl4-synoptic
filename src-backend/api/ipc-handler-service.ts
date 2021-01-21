import { MusicService } from './../services/music/music-service';
import { ipcMain, IpcMainEvent } from 'electron';
import { FileService } from '../services/file/file-service';

export class IpcHandlerService {

  constructor(private fileService: FileService, private musicService: MusicService) {
    this.listen();
  }

  listen() {
    ipcMain.on('file-request', this.handleGetFileRequest.bind(this));
    ipcMain.on('files-request', this.handleGetMultipleFilesRequest.bind(this));
    ipcMain.on('user-selected-files-request', this.handleGetUserSelectedFilesRequest.bind(this));
    ipcMain.on('directory-files-request', this.handleGetDirectoryFilesRequest.bind(this));
    ipcMain.on('save-file-request', this.handleSaveFileRequest.bind(this));
  }

  handleGetFileRequest(event: IpcMainEvent, path: string = '') {
    this.fileService.getFile(path).then((file: File) => {
      event.sender.send('file-response', file);
    },
      err => {
        event.sender.send('file-request-err', err);
      });
  }

  handleGetMultipleFilesRequest(event: IpcMainEvent, args: any[]) {
    this.fileService.getFiles(args).then((files: File[]) => {
      event.sender.send('files-response', files);
    });
  }

  handleGetUserSelectedFilesRequest(event: IpcMainEvent) {
    this.fileService.getFiles([]).then((files: File[]) => {
      event.sender.send('user-selected-files-response', files);
    });
  }

  handleGetDirectoryFilesRequest(event: IpcMainEvent, args: any[]) {
    this.fileService.getFilesInDirectory(args).then((files: File[]) => {
      event.sender.send('directory-files-response', files);
    });
  }

  handleSaveFileRequest(event: IpcMainEvent, args: { path: string, content: string }) {
    this.fileService.saveFile(args.path, args.content).then(saved => {
      event.sender.send('save-file-response', saved);
    })
  }

}