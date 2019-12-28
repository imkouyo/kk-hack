import {Component, OnDestroy, OnInit} from '@angular/core';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {KkHackService} from '../../service/kk-hack.service';
import {of, Subject} from 'rxjs';
import {catchError, debounceTime, switchMap, switchMapTo, take, takeUntil} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';
import {YoutubeService} from "../../service/youtube.service";

@Component({
  selector: 'app-whisper',
  templateUrl: './whisper.component.html',
  styleUrls: ['./whisper.component.scss']
})
export class WhisperComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faSearch = faSearch;
  whisperForm: FormGroup;
  stepList = ['step1', 'step2', 'step3'];
  defaultList;
  step = 0;
  audioList;
  stopSubscribe = new Subject<boolean>();
  search$ = new Subject<string>();
  areaPlaceholder = `  Typing your story in this block, and what whisper you want to say.
  Don't use too long sentence,
  otherwise the view can't not show all sentence.
  Official suggest one line don't exceed than 30 characters.
  `;
  userName = '';
  whisperName = '';
  songData = null;
  storyText = '';
  chooseIndex = -1;
  isValid = false;
  okBtn = 'Next'
  constructor(private formBuilder: FormBuilder,
              public popupRef: MatDialogRef<WhisperComponent>,
              private kkHackService: KkHackService,
              private spinner: NgxSpinnerService,
              private http: HttpClient,
              private youtubeService: YoutubeService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.kkHackService.isReady$.pipe(takeUntil(this.stopSubscribe.asObservable()), switchMap((state) => {
      if (state) {
        return  this.kkHackService.fetchTopPlaylist();
      } else {
        return of(null);
      }
    }), switchMap(res => {
      if (res) {
        return this.kkHackService.fetchTopPlaylistData(res['data']['data'][0]['id']);
      } else {
        return of(null);
      }
    })).subscribe(res => {
      if (res) {
        this.audioList = res['data']['data'].filter( (v, i) => i < 10 );
        this.defaultList = this.audioList;
      }
      this.spinner.hide();
    });
    this.search$.pipe(debounceTime(500), switchMap(  (target) => {
      if (!!target) {
        return this.kkHackService.searchResult(target);
      } else {
        return of(null);
      }
    })).subscribe(res => {
      this.songData = null;
      this.chooseIndex = -1;
      if (res) {
        this.audioList = res.data.tracks.data;
      } else {
        this.audioList = this.defaultList;
      }
    });
  }
  createWhisper(data) {
    this.popupRef.close(data);
  }
  searchSong(event) {
    console.log(event.target.value, 'search');
    this.search$.next(event.target.value);
  }
  closePopup() {
    this.popupRef.close();
  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }
  nextPage() {
    switch(this.step) {
      case 0:
        console.log(!!this.userName && !!this.whisperName);
        this.isValid = !!this.userName && !!this.whisperName;
        if (this.isValid) {
          this.step += 1;
          this.isValid = false;
        }
        break;
      case 1:
        console.log(!!this.songData);
        this.isValid = !!this.songData;
        if (this.isValid) {
          this.step += 1;
          this.isValid = false;
          this.okBtn = 'Finish'
        }
        break;
      case 2:
        console.log(!!this.storyText);
        this.isValid = !!this.storyText;
        if (this.isValid) {
          this.spinner.show()
          this.http.post('/whisper', {
            userName: this.userName,
            whisperName: this.whisperName,
            song: this.songData,
            story: this.storyText
          }).pipe(catchError(error => of(false))).subscribe(
            value => {
              console.log(value);
              this.spinner.hide();
              this.popupRef.close();

            }
          );
        }
        break;
    }
  }
  previousPage() {
    if (this.step > 0) {
      this.step -= 1;
      this.okBtn = 'Next';
    }
  }
  setMusic(event) {
    const encodeTarget = this.youtubeService.encodeValue(`${event.song.name} ${event.song.artist}`);
    this.youtubeService.searchMusic(encodeTarget, 1).pipe(take(1)).subscribe(
      res => {
        console.log(res);
        this.songData = {...event.song, id: res['items'][0]['id']['videoId']};
        console.log(this.songData);
      }
    );

    this.chooseIndex = event.index;

  }
}
