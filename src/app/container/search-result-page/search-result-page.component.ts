import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../service/search.service';
import {KkHackService} from '../../service/kk-hack.service';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {

  constructor( private searchService: SearchService, private kkHackService: KkHackService) { }
  targetID;
  ngOnInit() {
    this.searchService.handleCategory$.pipe(withLatestFrom(this.kkHackService.isReady$), map((first, second) => {
      console.log(first, second);
    }));
  }


}
