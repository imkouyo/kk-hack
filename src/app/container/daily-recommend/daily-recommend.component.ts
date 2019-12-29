import {Component, OnDestroy, OnInit} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import { KkHackService } from '../../service/kk-hack.service';
import { ActivatedRoute } from '@angular/router';
import { AudioControlService } from '../../service/audio-control.service';
import { YoutubeService } from '../../service/youtube.service';
import { KkHttpClientService } from '../../service/kk-http-client.service';

@Component({
  selector: 'app-daily-recommend',
  templateUrl: './daily-recommend.component.html',
  styleUrls: ['./daily-recommend.component.scss']
})
export class DailyRecommendComponent implements OnInit, OnDestroy {

  showList;
  currentPlayingIndex;
  stopSubscribe = new Subject<boolean>();
  constructor(private kkHttpClientService: KkHttpClientService,
              private acRouter: ActivatedRoute,
              private audioControlService: AudioControlService,
              private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.audioControlService.isDisable = false;
    this.kkHttpClientService.ACCESSTOKEN = window.localStorage.getItem('token');
    this.kkHttpClientService.getClientDaily(15).pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(list => this.showList = list['data']);
    this.audioControlService.handleNext$.
    pipe(takeUntil(this.stopSubscribe.asObservable()), switchMap( state => {
      if (state === 1 && this.currentPlayingIndex + 1 < this.showList.length) {
        this.currentPlayingIndex += 1;
        const encodeTarget = this.youtubeService
          .encodeValue(`${this.showList[this.currentPlayingIndex].name} ${this.showList[this.currentPlayingIndex].album.artist.name}`);
        return this.youtubeService.searchMusic(encodeTarget, 1);
      } else if(state === -1  && this.currentPlayingIndex - 1 >= 0) {
        this.currentPlayingIndex -= 1;
        const encodeTarget = this.youtubeService
          .encodeValue(`${this.showList[this.currentPlayingIndex].name} ${this.showList[this.currentPlayingIndex].album.artist.name}`);
        return this.youtubeService.searchMusic(encodeTarget, 1);
      } else {
        return of(null);
      }
    })).subscribe(res => {
      if (res) {
        console.log(res.items[0].id.videoId);
        this.audioControlService.player.cueVideoById(res.items[0].id.videoId);
        this.audioControlService.setMusicOnPanel(this.showList[this.currentPlayingIndex]);
        this.audioControlService.play();
      }
    });
  }
  playingIndex(event) {
    this.currentPlayingIndex = event;
  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }

}
