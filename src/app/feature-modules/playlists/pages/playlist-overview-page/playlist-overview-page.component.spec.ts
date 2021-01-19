import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistOverviewPageComponent } from './playlist-overview-page.component';

describe('PlaylistOverviewPageComponent', () => {
  let component: PlaylistOverviewPageComponent;
  let fixture: ComponentFixture<PlaylistOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistOverviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
