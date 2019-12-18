import {Component, Input, OnInit} from '@angular/core';
import { AudioControlService } from '../../service/audio-control.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss']
})
export class MusicCardComponent implements OnInit {
  @Input() musicDetail;
  @Input() topOrder;
  isShowPhotoAlbum = false;
  constructor(private audioControlService: AudioControlService) { }
  ngOnInit() {
  }
  closeImage() {
    this.isShowPhotoAlbum = false;
  }
  openImage() {
    this.isShowPhotoAlbum = true;
  }
  clickMusic() {
    this.audioControlService.setMusicOnPanel(this.musicDetail);
  }
}
