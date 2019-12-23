import { Component, OnInit } from '@angular/core';
import { KkHttpClientService } from '../../service/kk-http-client.service';

@Component({
  selector: 'app-user-playlist',
  templateUrl: './user-playlist.component.html',
  styleUrls: ['./user-playlist.component.scss']
})
export class UserPlaylistComponent implements OnInit {

  constructor(private kkHttpClientService: KkHttpClientService) { }
  playlist;
  ngOnInit() {
    this.kkHttpClientService.ACCESSTOKEN = window.localStorage.getItem('token');
    console.log(this.kkHttpClientService.ACCESSTOKEN, 'token')
    this.kkHttpClientService.getClientAllPlaylist().subscribe(
      list => {
        this.playlist = list['data'];
        console.log(list);
      }
    );
  }

}
