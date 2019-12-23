import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlaylistResultComponent } from './user-playlist-result.component';

describe('UserPlaylistResultComponent', () => {
  let component: UserPlaylistResultComponent;
  let fixture: ComponentFixture<UserPlaylistResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPlaylistResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlaylistResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
