import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {YoutubePlayerService} from "ngx-youtube-player";
import {AudioControlService} from "../../service/audio-control.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {YoutubeService} from "../../service/youtube.service";

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss']
})
export class SearchResultCardComponent implements OnInit, OnChanges{
  @Input() musicData;
  songCover = '';
  songName = '';
  songArtist = '';
  stopSubscribe = new Subject();
  constructor(private youtubeService: YoutubeService,
              private audioControlService: AudioControlService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    this.songCover = this.musicData['album']['images'][0]['url'] || '';
    this.songName = this.musicData.name || '';
    this.songArtist = this.musicData['album']['artist']['name'] || '';
  }
  chooseMusic() {
    const encodeTarget = this.youtubeService.encodeValue(`${this.songName} ${this.songArtist}`);
    this.youtubeService.searchMusic(encodeTarget, 1).pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(
      res => {
        this.audioControlService.player.cueVideoById(res['items'][0].id.videoId);
        this.audioControlService.play();
        this.audioControlService.setMusicOnPanel(this.musicData);
      }
    );
  }

}
