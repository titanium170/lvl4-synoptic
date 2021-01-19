import { ITrack } from './track';

export interface IPlaylist {
  name: string;
  tracks: ITrack[];
}

export class Playlist implements IPlaylist {

  public name: string;
  public tracks: ITrack[];

  constructor(name: string, tracks: ITrack[]) {
    this.name = name;
    this.tracks = tracks;
  }
}