import { dialog } from 'electron';
import { OpenDialogReturnValue } from 'electron/main';
import { mkdir, readFile, writeFile } from 'fs';
import { glob } from 'glob';
import { join } from 'path';

export class FileService {

  constructor() { }


  getFile(path: string): Promise<File> {
    const paths = [];
    if (path) {
      if (path.includes('appdata') && process.env.APPDATA) {
        path = join(process.env.APPDATA, 'rglynn-synoptic/store.json')
      }
      paths.push(path);
    }
    return this.getFiles(paths).then(files => files[0]);
  }

  getFiles(paths: string[]): Promise<File[]> {
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

  getFilesInDirectory(args: any[]): Promise<File[]> {
    return new Promise((resolve, reject) => {
      glob(`${args[0]}/**/*${args[1]}`, {}, (err, files) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          this.getFiles(files).then(Files => resolve(Files));
        }
      });
    });
  }

  saveFile(path: string, content: string): Promise<null> {
    return new Promise((resolve, reject) => {
      if (path.includes('appdata') && process.env.APPDATA) {
        path = join(process.env.APPDATA, 'rglynn-synoptic/store.json')
        mkdir(join(process.env.APPDATA, 'rglynn-synoptic'), (err: NodeJS.ErrnoException | null) => {
          if (err) {
            return reject(err);
          }
          writeFile(path, content, (err: NodeJS.ErrnoException | null) => {
            if (err) {
              reject(err);
            } else {
              resolve(null);
            }
          });
        })
      } else {
        writeFile(path, content, (err: NodeJS.ErrnoException | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        });
      }


    })
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

  private readFiles(paths: string[]): Promise<File[]> {
    return new Promise((resolve, reject) => {
      const files: File[] = [];
      for (const filePath of paths) {
        readFile(filePath, (err: NodeJS.ErrnoException | null, fileContent: Buffer) => {
          if (err) {
            console.error(err);
            return reject(err);
          } else {
            const file = { content: fileContent } as unknown as File;
            file.path = filePath;
            files.push(file);
          }
          if (files.length === paths.length) {
            return resolve(files);
          }
        });
      }
    });
  }


}