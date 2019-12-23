import { Component, OnInit } from '@angular/core';
import { KkHttpClientService } from '../../service/kk-http-client.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private kkHttpClientService: KkHttpClientService) { }

  ngOnInit() {
    this.kkHttpClientService.getClientAllPlaylist().subscribe(
      value =>  console.log(value)
    );
  }

}
