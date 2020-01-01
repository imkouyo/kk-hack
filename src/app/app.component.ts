import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { KkHackService } from './service/kk-hack.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  constructor(private kk: KkHackService,) {
  }

  ngOnInit(): void {
    (<any>window).onYouTubeIframeAPIReady = () => {
      console.log('Ready');
      const player = new (<any>window).YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'Bey4XXJAqS8',
        playerVars: {'autoplay': 0, 'rel': 0, 'controls': 2, playsinline: true},
        events: {
          'onReady': () => {
          },
          'onStateChange': () => {
          }
        }
      });
    };

  }
  ngAfterViewInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.kk.getToken();
  }
}
