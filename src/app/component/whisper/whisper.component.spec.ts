import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhisperComponent } from './whisper.component';

describe('WhisperComponent', () => {
  let component: WhisperComponent;
  let fixture: ComponentFixture<WhisperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhisperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhisperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
