import { Component, Input, OnInit } from '@angular/core';
import { AudioControlService } from '../../service/audio-control.service';
import { YoutubeService } from '../../service/youtube.service';
import { HttpParameterCodec } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
  animations: [
    trigger('expandBlock', [
      transition(':enter', [
        style({ height: '0' }),
        animate(1500)
      ]),
      transition(':leave', [
        animate(1500, style({ height: '100%' }))
      ]),
    ])
  ]
})
export class MusicCardComponent implements OnInit, HttpParameterCodec {
  @Input() musicDetail;
  @Input() topOrder;
  isShowPhotoAlbum = false;
  searchResult: any;
  constructor(private audioControlService: AudioControlService, private youtubeService: YoutubeService) { }
  ngOnInit() {
  }
  clickMusic(event) {
    if (!this.isShowPhotoAlbum && !this.searchResult) {
      const encodeTarget = this.encodeValue(event);
      this.youtubeService.searchMusic(encodeTarget, 3).subscribe(
        res => {
          this.searchResult = res;
          this.isShowPhotoAlbum = true;
        }
      );
    } else {
      this.isShowPhotoAlbum = !this.isShowPhotoAlbum && !!this.searchResult;
    }
  }

  selectMusic(id) {
    this.audioControlService.player.cueVideoById(id);
    this.audioControlService.setMusicOnPanel(this.musicDetail);
  }
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
