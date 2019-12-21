import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../service/youtube.service';

@Component({
  selector: 'app-kk-oauth',
  templateUrl: './kk-oauth.component.html',
  styleUrls: ['./kk-oauth.component.scss']
})
export class KkOauthComponent implements OnInit {

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() {
  }
  login() {
    const locationURL = this.youtubeService.encodeValue('http://localhost:4200/#/kk-auth');
    const URL = 'https://account.kkbox.com/oauth2/authorize';
    window.location.href = `${URL}?redirect_uri=${locationURL}&client_id=eda1f36a346105672789cb2ba8187ff5&response_type=code&state=1234`;
  }
}
