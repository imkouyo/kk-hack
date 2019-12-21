import { Component, OnInit } from '@angular/core';
import { KkHackService } from '../../service/kk-hack.service';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AudioControlService } from '../../service/audio-control.service';
import { NgxSpinnerService}  from 'ngx-spinner';
import { YoutubeService } from '../../service/youtube.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  topList = [];
  showList;
  currentPlayingIndex;
  constructor(private kkHackService: KkHackService,
              private audioControlService: AudioControlService,
              private spinner: NgxSpinnerService,
              private youtubeService: YoutubeService) { }
  ngOnInit() {
    this.kkHackService.isReady$.pipe(switchMap(status => {
      if (status) {
        return this.kkHackService.fetchTopPlaylist();
      } else {
        return of(null);
      }
    }), switchMap(res => {
      if (res) {
        this.topList = res.data.data;
        return this.kkHackService.fetchTopPlaylistData(this.topList[0].id);
      } else {
        return of(null);
      }
    })).subscribe(res => {
      console.log(res);
      if (res) {
        this.showList = res.data.data;
      }
    });
    this.audioControlService.handleNext$.
    pipe(switchMap( state => {
      console.log(state);
      if (state === 1 && this.currentPlayingIndex + 1 < this.showList.length) {
        console.log(this.showList[this.currentPlayingIndex + 1].name, 'search');
        const encodeTarget = this.youtubeService.encodeValue(this.showList[this.currentPlayingIndex + 1].name);
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
  getTopList(event) {
    this.spinner.show();
    this.kkHackService.fetchTopPlaylistData(this.topList[event.index].id).subscribe(
      res => {
        this.showList = res['data']['data'];
        this.spinner.hide();
      });
  }
  playingIndex(event) {
    console.log(event, this.showList.length);
    this.currentPlayingIndex = event;
  }

}
