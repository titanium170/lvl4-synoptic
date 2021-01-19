import { IMediaFile } from './media-file';

export interface ITrack {

  name: string;
  artist: string;
  album: string;

}


export class Track implements ITrack {

  public name: string;
  public artist: string;
  public album: string;
  public file: IMediaFile;

  constructor(name: string, artist: string, album: string, file: IMediaFile) {
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.file = file;
  }
}