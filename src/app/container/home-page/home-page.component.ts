import { Component, OnInit } from '@angular/core';
import {KkHackService} from '../../service/kk-hack.service';
import {switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  newHitsPlaylist;
  topList = [];
  showList;
  constructor(private kkHackService: KkHackService) { }
  ngOnInit() {
    this.kkHackService.isReady$.pipe(switchMap(status => {
      if (status) {
        return this.kkHackService.fetchTopPlaylist();
      } else {
        return of(null);
      }
    }), switchMap(res => {
      if (res) {
        this.topList = res.data.data;
        return this.kkHackService.fetchTopPlaylistData(this.topList[0].id);
      } else {
        return of(null);
      }
    })).subscribe(res => {
      console.log(res);
      if (res) {
        this.showList = res.data.data;
      }
    });
  }
  getTopList(event) {
    this.kkHackService.fetchTopPlaylistData(this.topList[event.index].id).subscribe(
      res => {
        this.showList = res['data'].data;
        console.log(this.showList);
      });
  }
}
