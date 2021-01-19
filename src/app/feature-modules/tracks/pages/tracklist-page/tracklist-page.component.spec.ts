import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracklistPageComponent } from './tracklist-page.component';

describe('TracklistPageComponent', () => {
  let component: TracklistPageComponent;
  let fixture: ComponentFixture<TracklistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracklistPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracklistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
