import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsHomePageComponent } from './playlists-home-page.component';

describe('PlaylistsHomePageComponent', () => {
  let component: PlaylistsHomePageComponent;
  let fixture: ComponentFixture<PlaylistsHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistsHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
