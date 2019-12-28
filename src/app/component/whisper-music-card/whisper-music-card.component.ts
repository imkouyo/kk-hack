import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-whisper-music-card',
  templateUrl: './whisper-music-card.component.html',
  styleUrls: ['./whisper-music-card.component.scss']
})
export class WhisperMusicCardComponent implements OnInit,OnChanges{
  @Input() musicData;
  @Input() index;
  @Input() isChoose;
  @Output() setMusic = new EventEmitter<any>();
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
  selectMusic() {
    console.log({index: this.index, data: this.musicData});
    this.setMusic.emit({index: this.index,
      song: {
        name: this.musicName,
        artist: this.musicArtist
      }});
  }

}
