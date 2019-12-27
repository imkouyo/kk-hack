import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhisperMusicCardComponent } from './whisper-music-card.component';

describe('WhisperMusicCardComponent', () => {
  let component: WhisperMusicCardComponent;
  let fixture: ComponentFixture<WhisperMusicCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhisperMusicCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhisperMusicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
