import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-whisper-music-card',
  templateUrl: './whisper-music-card.component.html',
  styleUrls: ['./whisper-music-card.component.scss']
})
export class WhisperMusicCardComponent implements OnInit,OnChanges{
  @Input() musicData;
  musicCover = '';
  musicName = '';
  musicArtist = '';
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    this.musicArtist = this.musicData['album']['artist']['name'] ||　'';
    this.musicCover = this.musicData['album']['images'][0]['url'] ||　'';
    this.musicName = this.musicData.name || '';
  }

}
