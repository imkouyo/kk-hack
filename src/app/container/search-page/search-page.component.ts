import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {KkHackService} from '../../service/kk-hack.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {SearchService} from '../../service/search.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy{
  moodList;
  stopSubscribe = new Subject<boolean>();
  constructor(private kkHackService: KkHackService, private searchService: SearchService) { }
  ngOnInit() {
    this.kkHackService.isReady$.pipe(
      takeUntil(this.stopSubscribe.asObservable()),
      switchMap( (state) => {
        if (state) {
         return this.kkHackService.fetchAllMood();
        } else {
          return of(null);
        }
      }
    )).subscribe(res => {
      if (res) {
        this.moodList = res.data.data;
      }
    });
    this.searchService.handleSearchBar$.pipe(takeUntil(this.stopSubscribe.asObservable()), switchMap( target => {
      if (!!target) {
        return this.kkHackService.searchResult(target);
      } else {
        return of(null);
      }
    })).subscribe(
      res => {
        if (res) {
          console.log(res);
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }
}

