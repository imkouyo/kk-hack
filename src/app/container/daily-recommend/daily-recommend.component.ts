import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
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
export class DailyRecommendComponent implements OnInit {

  showList;
  currentPlayingIndex;
  constructor(private kkHttpClientService: KkHttpClientService,
              private acRouter: ActivatedRoute,
              private audioControlService: AudioControlService,
              private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.kkHttpClientService.ACCESSTOKEN = window.localStorage.getItem('token');
    this.kkHttpClientService.getClientDaily(15).subscribe(list => this.showList = list['data']);
    this.audioControlService.handleNext$.
    pipe(switchMap( state => {
      console.log(state);
      if (state === 1 && this.currentPlayingIndex + 1 < this.showList.length) {
        const encodeTarget = this.youtubeService
          .encodeValue(`${this.showList[this.currentPlayingIndex + 1].name} ${this.showList[this.currentPlayingIndex + 1].album.artist.name}`);
        return this.youtubeService.searchMusic(encodeTarget, 1);
      } else {
        return of(null);
      }
    })).subscribe(res => {
      if (res) {
        console.log(res.items[0].id.videoId);
        this.audioControlService.player.cueVideoById(res.items[0].id.videoId);
        this.currentPlayingIndex += 1;
        this.audioControlService.setMusicOnPanel(this.showList[this.currentPlayingIndex]);
        this.audioControlService.play();
      }
    });
  }
  playingIndex(event) {
    console.log(event, this.showList.length);
    this.currentPlayingIndex = event;
  }

}
