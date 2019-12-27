import {Component, OnDestroy, OnInit} from '@angular/core';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {KkHackService} from '../../service/kk-hack.service';
import {of, Subject} from 'rxjs';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';

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
  Official suggest one line don't exceed than 20 characters.
  `;
  userName = '';
  whisperName = '';
  songData;
  storyText = '';
  constructor(private formBuilder: FormBuilder,
              public popupRef: MatDialogRef<WhisperComponent>,
              private kkHackService: KkHackService,
              private spinner: NgxSpinnerService,
              private http: HttpClient,
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
    this.search$.next(event.target.value);
  }
  closePopup() {
    this.popupRef.close();
  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }
  nextPage() {
    if (this.step < 2) {
      this.step += 1;
    } else {
      this.http.post('/whisper', {
        userName: this.userName,
        whisperName: this.whisperName,
        song: this.songData,
        story: this.storyText
      }).subscribe(
        value => console.log(value)
      );
    }
  }
  previousPage() {
    if (this.step > 0) {
      this.step -= 1;
    }
  }
}
