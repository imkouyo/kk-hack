import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TimeFormatService } from './time-format.service';

@Injectable({
  providedIn: 'root'
})
export class AudioControlService {


  // tslint:disable-next-line:variable-name
  private _isDisable;
  // tslint:disable-next-line:variable-name
  private _player;
  // tslint:disable-next-line:variable-name
  private _currentDuration;
  private audioInterval;
  private isPlaying = new BehaviorSubject<boolean>(false);
  public isPlaying$ = this.isPlaying.asObservable();
  private currentDuration = new BehaviorSubject<number>(0);
  public currentDuration$ = this.currentDuration.asObservable();
  private ready = new Subject<number>();
  public ready$ = this.ready.asObservable();
  constructor(private timeFormatService: TimeFormatService) { }
  set isDisable(state) {
    this._isDisable = state;
  }
  get isDisable() {
    return this._isDisable;
  }
  set player(element) {
    this._player = element;
  }
  get player() {
    return this._player;
  }
  public duration() {
    if (this.player) {
      return this.player.getDuration();
    }
    return 0;
  }
  play() {
    this.player.playVideo();
  }
  pause() {
    this.player.pauseVideo();
  }
  stop() {
    this.player.stopVideo();
  }
  audioStart() {
    this.isPlaying.next(true);
    if (!this.audioInterval) {
      this.audioInterval = setInterval(() => {
        this.currentDuration.next(this.currentDuration.value  + 1);
      }, 1000);
    }
  }
  audioPause() {
    this.isPlaying.next(false);
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
      this.audioInterval = false;
    }
  }
  audioStop() {
    this.currentDuration.next(0);
    this.isPlaying.next(false);
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
      this.audioInterval = false;
    }
  }
  audioSeek(percentage) {
    const sec = this.timeFormatService.percentageToSec(percentage, this.duration())
    this.currentDuration.next(sec);
    this.player.seekTo(sec);
  }
  audioState(state) {
    console.log('service', state.data);
    if (state.data === -1) {
      this.setReadyState(-1);
    } else if (state.data === 0) {
      this.stop();
    } else if (state.data === 1 ) {
      this.audioStart();
      this.setReadyState(1);
    } else if (state.data === 2) {
      this.audioPause();
      this.setReadyState(2);
    } else if (state.data === 3) {
      this.isPlaying.next(false);
      this.setReadyState(3);
    } else if (state.data === 5) {
      this.audioStop();
      this.setReadyState(5);
      }
    }
  setReadyState(state) {
    this.ready.next(state);
  }
}
