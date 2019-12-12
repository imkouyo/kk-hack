import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-control',
  templateUrl: './audio-control.component.html',
  styleUrls: ['./audio-control.component.scss']
})
export class AudioControlComponent implements OnInit {

  constructor() { }
  player: any;
  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  videoReady(event) {
    console.log('ready', event);
    this.player =  event.target;
  }

  videoState(event) {
    console.log('state', event);
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
    console.log(this.player.getDuration());
  }

}
