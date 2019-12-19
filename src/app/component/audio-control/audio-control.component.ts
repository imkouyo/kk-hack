import { Component, OnInit } from '@angular/core';
import { faBackward, faForward, faPause, faPlay, faStop, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { AudioControlService } from '../../service/audio-control.service';
import { TimeFormatService } from '../../service/time-format.service';

@Component({
  selector: 'app-audio-control',
  templateUrl: './audio-control.component.html',
  styleUrls: ['./audio-control.component.scss']
})

export class AudioControlComponent implements OnInit {

  faPause = faPause;
  faPlay = faPlay;
  faStop = faStop;
  faForward = faForward;
  faBackward = faBackward;
  faVolumeUp = faVolumeUp;

  currentDuration: number;
  durationMin = '0';
  durationSec = '00';
  songPercentage: number;
  currentMin;
  currentSec;
  volume;
  coverImage = '';
  musicName = '';
  artistName = '';
  videoId = 'S_E2EHVxNAE';
  constructor(public audioControlService: AudioControlService, private timeFormatService: TimeFormatService) { }
  ngOnInit() {
    this.audioControlService.currentDuration$.subscribe(time => {
      this.currentDuration = time;
      this.songPercentage = this.timeFormatService.secToPercentage(time, this.audioControlService.duration());
      this.currentSec = this.timeFormatService.secToSec(time);
      this.currentMin = this.timeFormatService.secToMin(time);
    });
    this.audioControlService.ready$.subscribe(state => {
      this.videoReady();
    });
    this.audioControlService.musicPanel$.subscribe(music => {
      this.musicName = music.album.name;
      this.artistName = music.album.artist.name;
      this.coverImage = music.album.images[0].url;
    });
  }

  videoReady() {
    if (!this.audioControlService.isDisable) {
      const duration = this.audioControlService.duration();
      this.volume = this.audioControlService.player.getVolume();
      this.durationMin = this.timeFormatService.secToMin(duration);
      this.durationSec = this.timeFormatService.secToSec(duration);
    }
  }
  slideTime(event) {
    if (!this.audioControlService.isDisable) {
      this.audioControlService.audioSeek(event.value);
    }
  }
  slideVolume(event) {
    if (!this.audioControlService.isDisable) {
      this.audioControlService.player.setVolume(event.value);
    }
  }
  play() {
    if (!this.audioControlService.isDisable) {
      this.audioControlService.play();
    }
  }
  pause() {
    if (!this.audioControlService.isDisable) {
      this.audioControlService.pause();
    }
  }
  stop() {
    if (!this.audioControlService.isDisable) {
      this.audioControlService.stop();
    }
  }
  initVideo(event) {
    this.audioControlService.player = event.target;
  }
  handleVideo(event) {
    this.audioControlService.setReadyState(event.data);
  }
}
