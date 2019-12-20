import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {KkHackService} from '../../service/kk-hack.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  moodList;
  constructor(private kkHackService: KkHackService) { }
  ngOnInit() {
    this.kkHackService.isReady$.pipe(
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
        console.log(res.data);
      }
    });
  }
}

