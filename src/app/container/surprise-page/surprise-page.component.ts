import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {Sentence} from '../../Interface/Sentence';
import { AudioControlService } from '../../service/audio-control.service';
import { MatDialog } from '@angular/material';
import { WhisperComponent } from '../../component/whisper/whisper.component';

@Component({
  selector: 'app-surprise-page',
  templateUrl: './surprise-page.component.html',
  styleUrls: ['./surprise-page.component.scss']
})
export class SurprisePageComponent implements OnInit {
  text: string;
  isComplete = false;
  story: Sentence[] = [
    { page: 1, sumPage: 6, text: 'Hi XXX!'},
    { page: 2, sumPage: 6, text: 'I want to tell you.'},
    { page: 3, sumPage: 6, text: 'I\'m happy because of you!'},
    { page: 4, sumPage: 6, text: 'Thanks You always here for me.'},
    { page: 5, sumPage: 6, text: 'And this song is dedicate for you.'},
    { page: 6, sumPage: 6, text: 'Hope you will like it'}
  ];
  @ViewChild('board', { static: true}) board: ElementRef;
  @ViewChild('completeBoard', { static: true}) completeBoard: ElementRef;
  constructor(private renderer: Renderer2, private audioControlService: AudioControlService, private popup: MatDialog) { }

  async ngOnInit() {
    this.audioControlService.isDisable = true;
    for await ( const i of this.story) {
      await this.timeout(8000);
      this.talk(i);
    }
  }
  talk(sentence: Sentence) {
    const el = this.renderer.createElement('div');
    this.renderer.addClass(el, 'typewriter-text');
    const te = this.renderer.createText(sentence.text);
    this.renderer.appendChild(el, te);
    this.renderer.appendChild(this.board.nativeElement, el);
    if (sentence.page === sentence.sumPage) {
      this.startMusic();
      setTimeout(() => {
        this.isComplete = true;
        for (const i of this.story) {
          const ele = this.renderer.createElement('div');
          this.renderer.appendChild(ele, this.renderer.createText(i.text));
          this.renderer.appendChild(this.completeBoard.nativeElement, ele);
        }
      }, 12000);
    }
    setTimeout(() => {
      this.renderer.removeChild(this.board.nativeElement, el);
    }, 7500);
  }

  timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  startMusic() {
    this.audioControlService.player.seekTo(70);
    this.audioControlService.player.setVolume(0);
    this.audioControlService.play();
    const interval = setInterval(() => {
      if (this.audioControlService.player.getVolume() === 100) {
        clearInterval(interval);
      } else {
        this.audioControlService.player.setVolume(this.audioControlService.player.getVolume() + 5);
      }
    }, 800);
  }
  videoReady(event) {
    this.audioControlService.player = event.target;
  }

  createWhisper() {
    const popupRef = this.popup.open(WhisperComponent, {
      width: '480px',
      position: {top: '158px'},
      panelClass: 'whisperOverlay'
    });
    popupRef.afterClosed().subscribe(res => {
      console.log('popup close');
    });
  }

}



