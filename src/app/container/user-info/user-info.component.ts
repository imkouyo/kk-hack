import { Component, OnInit } from '@angular/core';
import { KkHttpClientService } from '../../service/kk-http-client.service';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  faUser = faUser;
  isLogin = false;
  userName;
  userImage;
  constructor(private kkHttpClientService: KkHttpClientService) { }

  ngOnInit() {
    this.kkHttpClientService.ACCESSTOKEN = window.localStorage.getItem('token');
    this.kkHttpClientService.getClientData().pipe(
      catchError(error => {
        this.isLogin = false;
        this.userName = 'Login';
        return of(null);
      })
    ).subscribe(
      res =>  {
        if (res) {
          this.isLogin = true;
          this.userName = res.name;
          this.kkHttpClientService.setUserName(res.name);
          this.userImage = res.images[0].url;
        }

      }
    );
  }

}
