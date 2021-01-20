import { parseBuffer } from 'music-metadata';

export class MusicService {

  constructor() { }

  getMusicMetadata(file: Buffer, ext?: string) {
    return parseBuffer(file, ext);
  }


}