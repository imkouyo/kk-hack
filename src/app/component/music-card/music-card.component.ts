import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { AudioControlService } from '../../service/audio-control.service';
import { YoutubeService } from '../../service/youtube.service';
import { HttpParameterCodec } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
export class MusicCardComponent implements OnInit, OnDestroy {
  @Input() musicDetail;
  @Input() topOrder;
  @Output() currentIndex = new EventEmitter<number>();
  isShowPhotoAlbum = false;
  searchResult: any;
  stopSubscribe = new Subject<boolean>();
  constructor(private audioControlService: AudioControlService, private youtubeService: YoutubeService) { }
  ngOnInit() {
  }
  clickMusic() {
      const encodeTarget = this.youtubeService.encodeValue(`${this.musicDetail.name} ${this.musicDetail.album.artist.name}`);
      this.youtubeService.searchMusic(encodeTarget, 1).pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(
        res => {
          this.searchResult = res;
          this.audioControlService.player.cueVideoById(res['items'][0].id.videoId);
          this.audioControlService.play();
          this.audioControlService.setMusicOnPanel(this.musicDetail);
          this.currentIndex.emit(this.topOrder);
        }
      );
    }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }
}
