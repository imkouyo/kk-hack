import { Component, OnInit } from '@angular/core';
import {faPause, faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
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

  currentDuration: number;
  durationMin = '0';
  durationSec = '00';
  songPercentage: number;
  currentMin;
  currentSec;
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
  }

  videoReady() {
    if (!this.audioControlService.isDisable) {
      const duration = this.audioControlService.duration();
      this.durationMin = this.timeFormatService.secToMin(duration);
      this.durationSec = this.timeFormatService.secToSec(duration);
    }
  }
  slideTime(event) {
    if (!this.audioControlService.isDisable) {
      this.audioControlService.audioSeek(event.value);
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
}
