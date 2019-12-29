import {Component, OnDestroy, OnInit} from '@angular/core';
import { KkHttpClientService } from '../../service/kk-http-client.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AudioControlService} from '../../service/audio-control.service';

@Component({
  selector: 'app-user-playlist',
  templateUrl: './user-playlist.component.html',
  styleUrls: ['./user-playlist.component.scss']
})
export class UserPlaylistComponent implements OnInit, OnDestroy {

  constructor(private kkHttpClientService: KkHttpClientService, private audioControlService: AudioControlService) { }
  playlist;
  stopSubscribe = new Subject<boolean>();
  ngOnInit() {
    this.audioControlService.isDisable = false;
    this.kkHttpClientService.ACCESSTOKEN = window.localStorage.getItem('token');
    this.kkHttpClientService.getClientAllPlaylist().pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(
      list => {
        this.playlist = list['data'];
      }
    );
  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }

}
