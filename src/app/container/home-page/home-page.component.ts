import { Component, OnInit } from '@angular/core';
import {KkHackService} from '../../service/kk-hack.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  newHitsPlaylist;
  constructor(private kkHackService: KkHackService) { }
  ngOnInit() {
    this.kkHackService.isReady$.pipe(switchMap(status => {
      if (status) {
        return this.kkHackService.fetchNewHitsAllPlaylist();
      } else {
        return of(null);
      }
    })).subscribe(res => {
      if (res) {
        console.log(res.data);
        this.newHitsPlaylist = res.data.data;
      }
    });
  }
}
