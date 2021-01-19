import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTracklistComponent } from './playlist-tracklist.component';

describe('PlaylistTracklistComponent', () => {
  let component: PlaylistTracklistComponent;
  let fixture: ComponentFixture<PlaylistTracklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistTracklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistTracklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
