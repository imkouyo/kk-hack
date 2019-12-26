import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faAngleLeft, faAngleRight, faSearch} from '@fortawesome/free-solid-svg-icons';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {SearchService} from '../../service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  @ViewChild('inputBar', { static: true }) inputBar: ElementRef;
  stopSub = new Subject<boolean>();
  constructor(private searchService: SearchService) { }
  ngOnInit() {
    fromEvent(this.inputBar.nativeElement, 'keydown').pipe(debounceTime(500), takeUntil(this.stopSub.asObservable())).subscribe(
      event =>  {
        console.log(event['target'].value);
        this.searchService.setCategory(event['target'].value);
      });
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
