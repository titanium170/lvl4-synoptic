import { v4 as uuidv4 } from 'uuid';

export interface IMediaFile {
  id: string;
  path: string;
  type: string;
}

export class MediaFile implements IMediaFile {
  public id: string;
  public path: string;
  public type: string;

  constructor(path: string, type: string) {
    this.id = uuidv4();
    this.path = path;
    this.type = type;
  }
}