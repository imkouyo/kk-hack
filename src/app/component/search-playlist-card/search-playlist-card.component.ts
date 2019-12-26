import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-playlist-card',
  templateUrl: './search-playlist-card.component.html',
  styleUrls: ['./search-playlist-card.component.scss']
})
export class SearchPlaylistCardComponent implements OnInit, OnChanges {
  @Input() playlistData;
  playlistCover;
  playlistName;
  playlistDesc;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    this.playlistCover = this.playlistData.images[1]['url'] || '';
    this.playlistName = this.playlistData.title || '';
    this.playlistDesc = (this.playlistData.description.length > 45 ?
      this.playlistData.description.substr(0, 42) + '...' : this.playlistData.description) || '';
  }

}
