import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faAngleLeft, faAngleRight, faSearch} from '@fortawesome/free-solid-svg-icons';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {SearchService} from '../../service/search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  isShowSearchBar;
  currentPageName = '';
  isShowPageName =  false;
  @ViewChild('inputBar', { static: true }) inputBar: ElementRef;
  stopSub = new Subject<boolean>();
  constructor(private searchService: SearchService, private router: Router) {}
  ngOnInit() {
    fromEvent(this.inputBar.nativeElement, 'keydown').pipe(debounceTime(500), takeUntil(this.stopSub.asObservable())).subscribe(
      event =>  {
        this.searchService.setCategory(event['target'].value);
      });
    switch (this.router.url) {
      case '/home':
        this.currentPageName = 'Whisper';
        this.isShowPageName = true;
        break;
      case '/search':
        this.isShowSearchBar = true;
        break;
      case '/hot-list':
        this.currentPageName = 'Top List';
        this.isShowPageName = true;
        break;
      case '/kk-auth':
        this.currentPageName = 'KK-box ';
        this.isShowPageName = true;
      break;
      case '/user-all-playlist':
        this.currentPageName = 'Playlist';
        this.isShowPageName = true;
        break;
      case '/daily-recommend':
        this.currentPageName = 'Daily Recommend';
        this.isShowPageName = true;
        break;
      case '/user-playlist':
        this.currentPageName = 'User Playlist';
        this.isShowPageName = true;
        break;
      default:
        this.currentPageName = 'Mood List';
        this.isShowPageName = true;




    }
    this.isShowSearchBar = this.router.url === '/search';
  }
  goBack() {
    window.history.back();
  }

  goForward() {
    window.history.forward();
  }
  ngOnDestroy(): void {
    this.stopSub.next(true);
  }

}
