import { dialog } from 'electron';
import { OpenDialogReturnValue } from 'electron/main';
import { readFile } from 'fs';
import { glob } from 'glob';
import { IAudioMetadata } from 'music-metadata';

export interface MatchedFile {
  path: string;
  content: Buffer;
  metadata: IAudioMetadata;
}


export class FileService {

  constructor() { }


  getFile(path: string): Promise<MatchedFile> {
    const paths = [];
    if (path) {
      paths.push(path);
    }
    return this.getFiles(paths).then(files => files[0]);
  }

  getFiles(paths: string[]): Promise<MatchedFile[]> {
    if (paths?.length) {
      return this.readFiles(paths);
    }

    return this.openFileDialog().then((value: OpenDialogReturnValue) => {
      if (value.canceled) {
        throw new Error('No file selected');
      } else {
        return this.readFiles(value.filePaths);
      }
    });
  }

  getFilesInDirectory(args: any[]): Promise<MatchedFile[]> {
    return new Promise((resolve, reject) => {
      glob(`${args[0]}/**/*${args[1]}`, {}, (err, files) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          this.getFiles(files).then(matchedFiles => resolve(matchedFiles));
        }
      });
    });
  }

  private openFileDialog(): Promise<OpenDialogReturnValue> {
    return dialog.showOpenDialog({
      filters: [{
        name: 'Music',
        extensions: ['mp3']
      },
      {
        name: 'All Files',
        extensions: ['*']
      }
      ],
      properties: ['openFile', 'multiSelections']
    });
  }

  private readFiles(paths: string[]): Promise<MatchedFile[]> {
    return new Promise((resolve, reject) => {
      const files: MatchedFile[] = [];
      for (const filePath of paths) {
        readFile(filePath, (err: NodeJS.ErrnoException | null, content: Buffer) => {
          if (err) {
            console.error(err);
          } else {
            files.push({ path: filePath, content, metadata: {} as IAudioMetadata });
          }
          if (files.length === paths.length) {
            resolve(files);
          }
        });
      }
    });
  }

}