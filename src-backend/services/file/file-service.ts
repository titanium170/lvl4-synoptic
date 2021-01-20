import { dialog } from 'electron';
import { OpenDialogReturnValue } from 'electron/main';
import { readFile } from 'fs';
import { glob } from 'glob';

export interface MatchedFile {
  path: string;
  content: Buffer;
}


export class FileService {

  constructor() { }


  getFile(path: string): Promise<MatchedFile> {
    return this.getFiles([path]).then(files => files[0]);
  }

  getFiles(paths: string[]): Promise<MatchedFile[]> {
    if (paths) {
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
            files.push({ path: filePath, content });
          }
          if (paths.length - 1 === paths.indexOf(filePath)) {
            resolve(files);
          }
        });
      }
    });
  }

}