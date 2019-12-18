import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss']
})
export class MusicCardComponent implements OnInit {
  @Input() musicDetail;
  @Input() topOrder;
  isShowPhotoAlbum = false;
  constructor() { }
  ngOnInit() {
  }
  closeImage() {
    this.isShowPhotoAlbum = false;
  }
  openImage() {
    this.isShowPhotoAlbum = true;
  }

}
