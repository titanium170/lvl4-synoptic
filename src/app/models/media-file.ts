import { IAudioMetadata } from 'music-metadata';
import { TrackedEntitiy } from './tracked-entity';

export interface IMediaFile {
  path: string;
  type: string;
}

export interface MediaFileData extends IMediaFile {
  content: Blob;
  metadata: IAudioMetadata;
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
