import { TrackedEntitiy } from './tracked-entity';
import { TrackInfo } from './track';
import { v4 as uuidv4 } from 'uuid';

export interface IPlaylist {
  name: string;
  tracks: TrackInfo[];
}

export class Playlist extends TrackedEntitiy implements IPlaylist {

  public name: string;
  public tracks: TrackInfo[];

  constructor(name: string, tracks: TrackInfo[]) {
    super();
    this.name = name;
    this.tracks = tracks;
  }

}