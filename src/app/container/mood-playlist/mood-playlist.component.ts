import { Component, OnInit } from '@angular/core';
import { KkHackService } from '../../service/kk-hack.service';
import { ActivatedRoute } from '@angular/router';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import { AudioControlService } from '../../service/audio-control.service';
import { YoutubeService } from '../../service/youtube.service';

@Component({
  selector: 'app-mood-playlist',
  templateUrl: './mood-playlist.component.html',
  styleUrls: ['./mood-playlist.component.scss']
})
export class MoodPlaylistComponent implements OnInit {

  constructor(private kkHackService: KkHackService,
              private acRouter: ActivatedRoute,
              private audioControlService: AudioControlService,
              private youtubeService: YoutubeService
  ) { }
  moodId;
  showList;
  currentPlayingIndex;
  stopSubject = new Subject<boolean>();
  ngOnInit() {
    this.acRouter.queryParams.subscribe(param => {
      this.moodId = param.id;
    });

    this.kkHackService.isReady$.pipe(takeUntil(this.stopSubject.asObservable()), switchMap( state => {
      if (state) {
        return this.kkHackService.fetchMoodMetaData(this.moodId);
      } else {
        return of(null);
      }
    })).subscribe( res => {
      if (res) {
        this.showList = res.data.tracks.data;
      }
    });
    this.audioControlService.handleNext$.
    pipe(takeUntil(this.stopSubject.asObservable()), switchMap( state => {
      console.log(state);
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
    console.log(event, this.showList.length);
    this.currentPlayingIndex = event;
  }

}
