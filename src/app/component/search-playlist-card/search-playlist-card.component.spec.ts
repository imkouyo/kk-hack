import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlaylistCardComponent } from './search-playlist-card.component';

describe('SearchPlaylistCardComponent', () => {
  let component: SearchPlaylistCardComponent;
  let fixture: ComponentFixture<SearchPlaylistCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlaylistCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlaylistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
