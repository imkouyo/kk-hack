import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../service/youtube.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-kk-oauth',
  templateUrl: './kk-oauth.component.html',
  styleUrls: ['./kk-oauth.component.scss']
})
export class KkOauthComponent implements OnInit {

  constructor(private youtubeService: YoutubeService, private router: Router, public popupRef: MatDialogRef<KkOauthComponent>) { }

  ngOnInit() {
  }
  login() {
    const locationURL = this.youtubeService.encodeValue('http://ableave.com/#/kk-auth');
    // const locationURL = this.youtubeService.encodeValue('http://localhost:4200/#/kk-auth');
    const URL = 'https://account.kkbox.com/oauth2/authorize';
    // window.location.href = `${URL}?redirect_uri=${locationURL}&client_id=d3d005b2c0d6f774c20bed8858c32b45&response_type=code&state=1234`;
    window.location.href = `${URL}?redirect_uri=${locationURL}&client_id=eda1f36a346105672789cb2ba8187ff5&response_type=code&state=1234`;
  }
  logout() {
    this.router.navigate(['/home']).then(() => this.popupRef.close()
    );
  }
}
