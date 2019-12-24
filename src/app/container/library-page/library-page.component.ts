import {Component, OnDestroy, OnInit} from '@angular/core';
import { KkHttpClientService } from '../../service/kk-http-client.service';
import { YoutubeService } from '../../service/youtube.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { KkOauthComponent } from '../../component/kk-oauth/kk-oauth.component';
import { ActivatedRoute, Router } from '@angular/router';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import { faCompactDisc, faList, faShare, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss']
})

export class LibraryPageComponent implements OnInit, OnDestroy {
  constructor(private kkHttpClientService: KkHttpClientService,
              private youtubeService: YoutubeService,
              private spinner: NgxSpinnerService,
              private popup: MatDialog,
              private router: ActivatedRoute,
              private route: Router) { }
  AuthCode;
  faCompactDisc = faCompactDisc;
  faShare = faShare;
  isShowing = false;
  stopSubscribe = new Subject<boolean>();
  ngOnInit() {
    this.router.queryParams.pipe(takeUntil(this.stopSubscribe.asObservable())
      , switchMap(value => {
      this.kkHttpClientService.setUserCode(value.code || '');
      if (value.code) {
        return this.kkHttpClientService.accessToken(value.code);
      } else {
        return of(null);
      }
    }), switchMap(res => {
      if (res) {
        console.log('here');
        if (JSON.parse(res.body).error) {
          this.route.navigate(['/kk-auth']).then();
          return of(null);
        } else {
          this.kkHttpClientService.ACCESSTOKEN = JSON.parse(res.body).access_token;
          window.localStorage.setItem('token', this.kkHttpClientService.ACCESSTOKEN);
          return this.kkHttpClientService.getClientData();
        }
      }
    })).subscribe(
      res => {
        if (res) {
          this.isShowing = true;
        }
      }
    );
    this.kkHttpClientService.userCode$.pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(id => {
      this.AuthCode = id;
      if (this.AuthCode === '') {
        this.popup.open(KkOauthComponent, {
          panelClass: 'kk-auth-dialog'
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }
}
