import { v4 as uuidv4 } from 'uuid';
import { TrackedEntitiy } from './tracked-entity';

export interface IMediaFile {
  path: string;
  type: string;
}

export class MediaFile extends TrackedEntitiy implements IMediaFile {
  public path: string;
  public type: string;

  constructor(path: string, type: string) {
    super();
    this.path = path;
    this.type = type;
  }
}
