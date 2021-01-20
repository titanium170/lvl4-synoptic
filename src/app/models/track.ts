import { TrackedEntitiy } from './tracked-entity';
import { IMediaFile } from './media-file';
import { v4 as uuidv4 } from 'uuid';

export interface TrackInfo {
  name: string;
  artist: string;
  album: string;
}


export class Track extends TrackedEntitiy implements TrackInfo {

  public name: string;
  public artist: string;
  public album: string;
  public file: IMediaFile;

  constructor(name: string, artist: string, album: string, file: IMediaFile) {
    super();
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.file = file;
  }
}