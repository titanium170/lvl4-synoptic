import { TrackedEntitiy } from './tracked-entity';
import { IMediaFile } from './media-file';



export class Track extends TrackedEntitiy implements Track {

  public name: string;
  public artist: string;
  public album: string;
  public duration: number;
  public file: IMediaFile;

  constructor(name: string, artist: string, album: string, file: IMediaFile, duration = 0) {
    super();
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.file = file;
    this.duration = duration;
  }
}