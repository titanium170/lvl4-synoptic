import { MusicService } from './../services/music/music-service';
import { MatchedFile } from '../services/file/file-service';
import { ipcMain, IpcMainEvent } from 'electron';
import { FileService } from '../services/file/file-service';

export class IpcHandlerService {

  constructor(private fileService: FileService, private musicService: MusicService) {
    this.listen();
  }

  listen() {
    ipcMain.on('get-file-request', this.handleGetFileRequest.bind(this));
    ipcMain.on('get-files-request', this.handleGetMultipleFilesRequest.bind(this));
    ipcMain.on('get-user-selected-files-request', this.handleGetUserSelectedFilesRequest.bind(this));
    ipcMain.on('get-directory-files-request', this.handleGetDirectoryFilesRequest.bind(this));
  }

  handleGetFileRequest(event: IpcMainEvent, path: string = '') {
    this.fileService.getFile(path).then((file: MatchedFile) => {
      this.musicService.getMusicMetadata(file.content)
        .then(metadata => {
          file.metadata = metadata;
          event.sender.send('got-file-response', file);
        });
    });
  }

  handleGetMultipleFilesRequest(event: IpcMainEvent, args: any[]) {
    this.fileService.getFiles(args).then((files: MatchedFile[]) => {
      event.sender.send('got-files-response', files);
    });
  }

  handleGetUserSelectedFilesRequest(event: IpcMainEvent) {
    this.fileService.getFiles([]).then((files: MatchedFile[]) => {
      const mediaFiles: MatchedFile[] = [];
      for (const file of files) {
        this.musicService.getMusicMetadata(file.content).then(metadata => {
          file.metadata = metadata;
          mediaFiles.push(file);
          if (mediaFiles.length === files.length) {
            event.sender.send('got-user-selected-files-response', mediaFiles);
          }
        });
      }
    });
  }

  handleGetDirectoryFilesRequest(event: IpcMainEvent, args: any[]) {
    this.fileService.getFilesInDirectory(args).then((files: MatchedFile[]) => {
      event.sender.send('got-directory-files-response', files);
    });
  }


}