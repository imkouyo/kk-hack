import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { KkHackService } from './service/kk-hack.service';
import { HttpClient } from '@angular/common/http';
import {AudioControlService} from "./service/audio-control.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  constructor(private kk: KkHackService,private audioControlService: AudioControlService) {
  }

  ngOnInit(): void {
    (<any>window).onYouTubeIframeAPIReady = () => {
      console.log('Ready');
      const player = new (<any>window).YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'Bey4XXJAqS8',
        playerVars: {'autoplay': 1, 'rel': 0, fs: false, playsinline: true},
      });
      this.audioControlService.player = player;
    };

  }
  ngAfterViewInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.kk.getToken();
  }
}
