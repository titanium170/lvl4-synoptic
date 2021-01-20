import { Track } from './../../../models/track';
import { Queue } from 'src/app/models/queue';
/* tslint:disable:no-unused-variable */

import { TestBed, inject, fakeAsync, tick, flushMicrotasks, waitForAsync } from '@angular/core/testing';
import { QueueManagerService } from './queue-manager.service';
import { IMediaFile } from 'src/app/models/media-file';
import { takeHeapSnapshot } from 'process';

fdescribe('Service: QueueManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueueManagerService]
    });
  });

  it('should create', inject([QueueManagerService], (service: QueueManagerService) => {
    expect(service).toBeTruthy();
  }));

  it('should get queue', fakeAsync(inject([QueueManagerService], (service: QueueManagerService) => {
    let queue!: Queue;
    service.getQueue().subscribe((q: Queue) => queue = q);
    tick(1000);
    expect(queue).not.toBeFalsy();
    expect(queue?.length).toBe(0);
  })));


  it('should add item to queue', fakeAsync(inject([QueueManagerService], (service: QueueManagerService) => {
    const testTrack = new Track('Test name', 'Test artists', 'Test album', {} as IMediaFile);
    let queue!: Queue;
    service.add(testTrack);
    service.getQueue().subscribe(q => queue = q);
    tick(1000);
    expect(queue.length).toBe(1);
  })));

  it('should remove item from queue', fakeAsync(inject([QueueManagerService], (service: QueueManagerService) => {
    const testTrack = new Track('Test name', 'Test artists', 'Test album', {} as IMediaFile);
    let queue: Queue = new Queue([testTrack]);

    service.replaceQueue(queue);
    service.getQueue().subscribe(q => queue = q);
    tick(1000);
    expect(queue.length).toBe(1);

    service.remove(testTrack.id);
    service.getQueue().subscribe(q => queue = q);
    tick(1000);
    expect(queue.length).toBe(0);
  })));


  it('should move next', fakeAsync(inject([QueueManagerService], (service: QueueManagerService) => {
    const testTrack1 = new Track('Test name 1', 'Test artists 1', 'Test album 1', {} as IMediaFile);
    const testTrack2 = new Track('Test name 2', 'Test artists 2', 'Test album 2', {} as IMediaFile);
    let queue: Queue = new Queue([testTrack1, testTrack2]);

    service.replaceQueue(queue);
    service.getQueue().subscribe(q => queue = q);
    tick(1000);
    expect(queue.current.id).toBe(testTrack1.id);

    service.next();
    service.getQueue().subscribe(q => queue = q);
    tick(1000);
    expect(queue.current.id).toBe(testTrack2.id);
  })));

  it('should move previous', fakeAsync(inject([QueueManagerService], (service: QueueManagerService) => {
    const testTrack1 = new Track('Test name 1', 'Test artists 1', 'Test album 1', {} as IMediaFile);
    const testTrack2 = new Track('Test name 2', 'Test artists 2', 'Test album 2', {} as IMediaFile);
    let queue: Queue = new Queue([testTrack1, testTrack2]);
    queue.current = testTrack2;
    queue.prev = testTrack1;

    service.replaceQueue(queue);
    service.getQueue().subscribe(q => queue = q);
    tick(1000);
    expect(queue.current.id).toBe(testTrack2.id);

    service.prev();
    service.getQueue().subscribe(q => queue = q);
    tick(1000);
    expect(queue.current.id).toBe(testTrack1.id);
  })));

});
