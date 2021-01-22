import { Injectable, ɵɵgetCurrentView } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Queue } from 'src/app/models/queue';
import { Track } from 'src/app/models/track';
import { shuffle } from 'lodash-es';

export interface QueueSettings {
  loop: boolean;
  shuffle: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QueueManagerService {


  private queue$: ReplaySubject<Queue>;

  private settings: QueueSettings = {
    loop: true,
    shuffle: false
  };

  constructor() {
    this.queue$ = new ReplaySubject(1);
    this.reset();
  }

  public getQueue(): Observable<Queue> {
    return this.queue$.asObservable();
  }

  public config(settings?: QueueSettings): QueueSettings {
    if (settings) {
      this.settings = { ...this.settings, ...settings };
    }
    return { ...this.settings };
  }

  // note q.length is not being updated
  public add(track: Track): void {
    this.queue$.pipe(first()).subscribe(q => {
      q.add(track);
      // refactor (obvs)
      if (q.length > 1) {
        if (this.settings.loop) {
          if (q.prev.id === q.tracklist[q.length - 2].id) {
            q.prev = track;
          }
          if (q.next.id === q.tracklist[0].id) {
            q.next = track;
          }
        } else if (q.next === q.current) {
          q.next = track;
        }
      } else {
        q.current = track;
        q.next = track;
        q.prev = track;
      }
      this.queue$.next(q);
    });
  }

  public remove(trackId: string): void {
    this.queue$.pipe(first()).subscribe(q => {
      const indexToRemove = q.tracklist.map(t => t.id).indexOf(trackId);
      q.remove(indexToRemove);
      if (q.length > 0) {
        if (q.next.id === trackId) {
          q.next = this.getNext(q.tracklist, indexToRemove);
        } else if (q.prev.id === trackId) {
          q.prev = this.getPrev(q.tracklist, indexToRemove - 1);
        }
      }

      this.queue$.next(q);
    });
  }

  public reset(): void {
    this.queue$.next(new Queue([]));
  }

  public replaceQueue(newQueue: Queue): void {
    this.queue$.next(newQueue);
  }

  public next(): void {
    this.queue$.pipe(first()).subscribe(q => {
      if (q.tracklist.length) {
        if (this.settings.shuffle) {
          q.tracklist = shuffle(q.tracklist);
        }
        q.prev = q.current;
        q.current = q.next;
        q.next = this.getNext(q.tracklist, q.tracklist.map(t => t.id).indexOf(q.current.id) + 1);
      }
      this.queue$.next(q);
    });
  }

  public prev(): void {
    this.queue$.pipe(first()).subscribe(q => {
      if (q.tracklist.length) {
        if (this.settings.shuffle) {
          q.tracklist = shuffle(q.tracklist);
        }
        q.next = q.current;
        q.current = q.prev;
        q.prev = this.getPrev(q.tracklist, q.tracklist.map(t => t.id).indexOf(q.current.id) - 1);
      }
      this.queue$.next(q);
    });
  }

  public changeTrack(trackId: string): void {
    this.queue$.pipe(first()).subscribe(q => {
      q.current = q.tracklist[q.tracklist.map(t => t.id).indexOf(trackId)];
      if (this.settings.shuffle) {
        q.tracklist = shuffle(q.tracklist);
      }
      const newIndex = q.tracklist.map(t => t.id).indexOf(q.current.id);
      q.next = this.getNext(q.tracklist, newIndex + 1);
      q.prev = this.getPrev(q.tracklist, newIndex + 1);
      this.queue$.next(q);
    });
  }

  private getNext(tracklist: Track[], index: number): Track {
    if (index >= tracklist.length) {
      if (this.settings.loop) {
        return tracklist[0];
      } else {
        return tracklist[tracklist.length - 1];
      }
    }
    return tracklist[index];
  }

  private getPrev(tracklist: Track[], index: number): Track {
    if (index < 0) {
      if (this.settings.loop) {
        return tracklist[tracklist.length - 1];
      } else {
        return tracklist[0];
      }
    }
    return tracklist[index];
  }

}
