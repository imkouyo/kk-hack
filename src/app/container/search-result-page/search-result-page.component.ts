import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {SearchService} from '../../service/search.service';
import {KkHackService} from '../../service/kk-hack.service';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { YoutubeService } from '../../service/youtube.service';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {


  @ViewChild('kk', {static: true}) ele: ElementRef;
  constructor( private searchService: SearchService,
               private kkHackService: KkHackService,
               private router: ActivatedRoute,
               private youtubeService: YoutubeService
  ) { }
  targetID;
  ngOnInit() {
    console.log(this.router.snapshot.paramMap.get('id'));

    this.router.queryParams.pipe(switchMap( parameter => {
      this.targetID = parameter.id;
      console.log(parameter.id, 'id');
      return this.kkHackService.isReady$;
    }), switchMap(state => {
      if (state) {
        return  this.kkHackService.fetchMoodMetaData(this.targetID);
      } else {
        return of(null);
      }
    })).subscribe(data => console.log(data));
    // this.kkHackService.isReady$.pipe(
    //   switchMap( state => {
    //     if (state) {
    //       return this.kkHackService.fetchMoodMetaData()
    //     }
    //   })
    // ).subscribe()
  }
  login() {
    const loacationURL = this.youtubeService.encodeValue('http://localhost:4200/#/kk-auth-success');
    window.location.href = `https://account.kkbox.com/oauth2/authorize?redirect_uri=${loacationURL}&client_id=eda1f36a346105672789cb2ba8187ff5&response_type=code&state=1234`;
  }


}
