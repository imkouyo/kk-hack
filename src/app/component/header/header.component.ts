import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faAngleLeft, faAngleRight, faSearch} from '@fortawesome/free-solid-svg-icons';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {SearchService} from '../../service/search.service';
import {ActivatedRoute, Router} from "@angular/router";
import {CommentPageComponent} from "../../container/comment-page/comment-page.component";
import {SearchPageComponent} from "../../container/search-page/search-page.component";
import {HomePageComponent} from "../../container/home-page/home-page.component";
import {MoodPlaylistComponent} from "../../container/mood-playlist/mood-playlist.component";
import {LibraryPageComponent} from "../../container/library-page/library-page.component";
import {UserInfoComponent} from "../../container/user-info/user-info.component";
import {UserPlaylistComponent} from "../../container/user-playlist/user-playlist.component";
import {DailyRecommendComponent} from "../../container/daily-recommend/daily-recommend.component";
import {UserPlaylistResultComponent} from "../../container/user-playlist-result/user-playlist-result.component";

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
        console.log(event['target'].value);
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
