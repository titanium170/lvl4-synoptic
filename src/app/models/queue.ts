import { Track } from './track';

export class Queue {

  public current!: Track;
  public prev!: Track;
  public next!: Track;
  public length: number;
  tracklist: Track[];


  constructor(tracklist: Track[]) {
    if (tracklist?.length) {
      this.current = tracklist[0];
      this.next = this.current;
      this.prev = this.current;
      if (tracklist?.length > 1) {
        this.next = tracklist[1];
      }
    }
    this.length = tracklist?.length ?? 0;
    this.tracklist = tracklist ?? [];
  }

  public add(track: Track): Queue {
    this.tracklist.push(track);
    this.length++;
    return this;
  }

  public remove(index: number): Queue {
    this.tracklist.splice(index, 1);
    this.length--;
    return this;
  }
}