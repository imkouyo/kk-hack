import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss']
})
export class SearchResultCardComponent implements OnInit, OnChanges{
  @Input() musicData;
  songCover = '';
  songName = '';
  songArtist = '';
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    this.songCover = this.musicData['album']['images'][0]['url'] || '';
    this.songName = this.musicData.name || '';
    this.songArtist = this.musicData['album']['artist']['name'] || '';
  }

}
