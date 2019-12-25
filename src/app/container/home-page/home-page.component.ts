import {Component, OnDestroy, OnInit} from '@angular/core';
import { KkHackService } from '../../service/kk-hack.service';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import { AudioControlService } from '../../service/audio-control.service';
import { NgxSpinnerService}  from 'ngx-spinner';
import { YoutubeService } from '../../service/youtube.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  topList = [];
  showList;
  currentPlayingIndex;
  stopSubscribe = new Subject<boolean>();
  constructor(private kkHackService: KkHackService,
              private audioControlService: AudioControlService,
              private spinner: NgxSpinnerService,
              private youtubeService: YoutubeService,
              private http: HttpClient) { }
  ngOnInit() {
    this.audioControlService.isDisable = false;
    this.kkHackService.isReady$.pipe( takeUntil(this.stopSubscribe.asObservable())
      , switchMap(status => {
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
    pipe(takeUntil(this.stopSubscribe.asObservable()), switchMap( state => {
      console.log(state);
      if (state === 1 && this.currentPlayingIndex + 1 < this.showList.length) {
        const encodeTarget = this.youtubeService
          .encodeValue(`${this.showList[this.currentPlayingIndex + 1].name} ${this.showList[this.currentPlayingIndex + 1]
            .album.artist.name}`);
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
    this.currentPlayingIndex = event;
  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }
  videoData() {
    this.http.get('/hello').subscribe(value => console.log(value));
  }

}
