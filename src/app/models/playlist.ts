import { TrackedEntitiy } from './tracked-entity';
import { Track } from './track';

export interface IPlaylist {
  name: string;
  tracks: Track[];
}

export class Playlist extends TrackedEntitiy implements IPlaylist {

  public name: string;
  public tracks: Track[];

  constructor(name: string, tracks: Track[]) {
    super();
    this.name = name;
    this.tracks = tracks;
  }

}