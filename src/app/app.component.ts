import { Component, OnInit } from '@angular/core';
import { KkHackService } from './service/kk-hack.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private kk: KkHackService) {
  }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.kk.getToken();
  }
}
