import { Component, OnInit } from '@angular/core';
import { KkHttpClientService } from '../../service/kk-http-client.service';
import { YoutubeService } from '../../service/youtube.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { KkOauthComponent } from '../../component/kk-oauth/kk-oauth.component';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { faCompactDisc, faList, faShare, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss']
})

export class LibraryPageComponent implements OnInit {
  constructor(private kkHttpClientService: KkHttpClientService,
              private youtubeService: YoutubeService,
              private spinner: NgxSpinnerService,
              private popup: MatDialog,
              private router: ActivatedRoute,
              private route: Router) { }
  AuthCode;
  faCompactDisc = faCompactDisc;
  faList = faList;
  faShare = faShare;
  faUser = faUser;
  isShowing = false;
  ngOnInit() {
    this.router.queryParams.pipe(switchMap(value => {
      this.kkHttpClientService.setUserCode(value.code || '');
      if (value.code) {
        console.log(value.code, 'value');
        // this.kkHttpClientService.setUserCode(value.code);
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
          console.log(res);
        }
      }
    );
    this.kkHttpClientService.userCode$.subscribe(id => {
      this.AuthCode = id;
      console.log(id, 'id');
      if (this.AuthCode === '') {
        this.popup.open(KkOauthComponent, {
          panelClass: 'kk-auth-dialog'
        });
      }
    });
  }
  kkAuth() {
    const loacationURL = this.youtubeService.encodeValue('http://localhost:4200/#/kk-auth');
    const URL = 'https://account.kkbox.com/oauth2/authorize';
    window.location.href =
      `${URL}?redirect_uri=${loacationURL}&client_id=eda1f36a346105672789cb2ba8187ff5&response_type=code&state=1234`;
  }
  userData() {
    this.kkHttpClientService.getClientData().subscribe(value => console.log(value));
  }
  userDailyRecommended() {

  }

}
