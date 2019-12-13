import { Component, OnInit } from '@angular/core';
import {faPause, faPlay, faStop} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-audio-control',
  templateUrl: './audio-control.component.html',
  styleUrls: ['./audio-control.component.scss']
})
export class AudioControlComponent implements OnInit {

  constructor() { }
  player: any;
  durationMin = '0';
  durationSec = '00';
  currentMin = '0';
  currentSec = '00';
  currentDuration = 0;
  songProcessPercent: number;
  intv;
  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  isPlaying = false;
  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  videoReady(event) {
    this.currentDuration = 0;
    console.log('ready', event);
    this.player =  event.target;
    const duration = this.player.getDuration();
    this.durationMin = Math.floor(duration / 60).toString();
    this.durationSec =  (duration % 60) < 10 ? `0${duration % 60}` : (duration % 60).toString();
    this.currentMin = '0';
    this.currentSec = '00';
  }

  videoState(event) {
    console.log('state', event);
    if (event.data === 0) {
      this.stop();
    } else if (event.data === 1 ) {
      this.isPlaying = true;
      if (!this.intv) {
        this.intv = setInterval(() => {
          this.currentDuration += 1;
          this.songProcessPercent =  Math.floor((this.currentDuration * 100) / this.duration());
          this.currentMin = Math.floor(this.currentDuration / 60).toString();
          this.currentSec =  (this.currentDuration  % 60) < 10 ?
            `0${this.currentDuration  % 60}` : (this.currentDuration  % 60).toString();
          console.log(this.songProcessPercent, this.currentDuration);
        }, 1000);
      }
    } else if (event.data === 2) {
      this.isPlaying = false;
      if (this.intv) {
        clearInterval(this.intv);
        this.intv = false;
      }
    } else if (event.data === 3) {
      this.isPlaying = false;
    } else if (event.data === 5) {
      this.currentDuration = 0;
      this.isPlaying = false;
      if (this.intv) {
        clearInterval(this.intv);
        this.intv = false;
        this.currentMin = '0';
        this.currentSec = '00';
      }
    }
  }
  slideTime(event) {
    console.log(event.value);
    const currentPercentage = event.value;
    const seek =  Math.floor(this.duration() * currentPercentage / 100);
    this.currentDuration = seek;
    this.songProcessPercent =  Math.floor((this.currentDuration * 100) / this.duration());
    this.currentMin = Math.floor(this.currentDuration / 60).toString();
    this.currentSec =  (this.currentDuration  % 60) < 10 ?
      `0${this.currentDuration  % 60}` : (this.currentDuration  % 60).toString();
   // this.player.pause();
   // event
    this.player.seekTo(seek);
  }

  errorHandle(event) {
    console.log('error', event);
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
  currentTime() {
    console.log(this.player.getCurrentTime());
  }

  duration() {
    return this.player.getDuration();
  }

}
