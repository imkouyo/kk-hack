import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {KkHackService} from '../../service/kk-hack.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {SearchService} from '../../service/search.service';
import {YoutubeService} from '../../service/youtube.service';
import {AudioControlService} from '../../service/audio-control.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy{
  moodList;
  mode = 'inti';
  topName = '';
  topArtist = '';
  topCover = '';
  result;
  stopSubscribe = new Subject<boolean>();
  constructor(private kkHackService: KkHackService,
              private searchService: SearchService,
              private youtubeService: YoutubeService,
              private audioControlService: AudioControlService) { }
  ngOnInit() {
    this.kkHackService.isReady$.pipe(
      takeUntil(this.stopSubscribe.asObservable()),
      switchMap( (state) => {
        if (state) {
         return this.kkHackService.fetchAllMood();
        } else {
          return of(null);
        }
      }
    )).subscribe(res => {
      if (res) {
        this.moodList = res.data.data;
      }
    });
    this.searchService.handleSearchBar$.pipe(takeUntil(this.stopSubscribe.asObservable()), switchMap( target => {
      if (!!target) {
        return this.kkHackService.searchResult(target);
      } else {
        console.log('null');
        return of(null);
      }
    })).subscribe(
      res => {
        if (res) {
          this.result = res.data;
          // console.log(this.result.tracks['data'][0]['name'])
          console.log(res);
          if (this.result.tracks['data'].length > 0) {
            this.topCover = res.data.tracks['data'][0]['album']['images'][1]['url'] || '';
            this.topName = res.data.tracks['data'][0]['name'] || '';
            this.topArtist = res.data.tracks['data'][0]['album']['artist']['name'] || '';
            this.mode = 'search';
            } else {
            this.mode = 'notfound';
          }
        } else {
          console.log(res);
          this.mode = 'init';
        }
      }
    );

  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }
  clickMusic() {
    const encodeTarget = this.youtubeService.encodeValue(`${this.topName} ${this.topArtist}`);
    this.youtubeService.searchMusic(encodeTarget, 1).pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(
      res => {
        this.audioControlService.player.cueVideoById(res['items'][0].id.videoId);
        this.audioControlService.play();
        this.audioControlService.setMusicOnPanel(this.result.tracks['data'][0]);
      }
    );
  }
}

