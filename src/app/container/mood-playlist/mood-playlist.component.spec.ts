import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodPlaylistComponent } from './mood-playlist.component';

describe('MoodPlaylistComponent', () => {
  let component: MoodPlaylistComponent;
  let fixture: ComponentFixture<MoodPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
