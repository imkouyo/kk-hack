import {Component, OnDestroy, OnInit} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import { KkHttpClientService } from '../../service/kk-http-client.service';
import { ActivatedRoute } from '@angular/router';
import { AudioControlService } from '../../service/audio-control.service';
import { YoutubeService } from '../../service/youtube.service';

@Component({
  selector: 'app-user-playlist-result',
  templateUrl: './user-playlist-result.component.html',
  styleUrls: ['./user-playlist-result.component.scss']
})
export class UserPlaylistResultComponent implements OnInit, OnDestroy {
  showList;
  currentPlayingIndex;
  playlistId;
  stopSubscribe = new Subject<boolean>()
  constructor(private kkHttpClientService: KkHttpClientService,
              private acRouter: ActivatedRoute,
              private audioControlService: AudioControlService,
              private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.audioControlService.isDisable = false;
    this.kkHttpClientService.ACCESSTOKEN = window.localStorage.getItem('token');
    this.acRouter.queryParams.subscribe(param => {
      this.playlistId = param.id;
    });

    this.kkHttpClientService.getClientPlaylist(this.playlistId).subscribe( res => {
      if (res) {
        console.log(res);
        this.showList = res['tracks']['data'];
      }
    });
    this.audioControlService.handleNext$.
    pipe(takeUntil(this.stopSubscribe.asObservable()), switchMap( state => {
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
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }


}
