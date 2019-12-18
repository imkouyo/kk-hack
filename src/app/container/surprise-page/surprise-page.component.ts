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
  videoId = 'S_E2EHVxNAE';
  story: Sentence[] = [
    { page: 1, sumPage: 6, text: 'Hi XXX!'},
    { page: 2, sumPage: 6, text: 'I want to tell you.'},
    { page: 3, sumPage: 6, text: 'I\'m happy because of you!'},
    { page: 4, sumPage: 6, text: 'Thanks You always here for me.'},
    { page: 5, sumPage: 6, text: 'And this song is dedicate for you.'},
    { page: 6, sumPage: 6, text: 'Hope you will like it'}
  ];
  storyList = [];
  @ViewChild('board', { static: true}) board: ElementRef;
  @ViewChild('completeBoard', { static: true}) completeBoard: ElementRef;
  constructor(private renderer: Renderer2, private audioControlService: AudioControlService, private popup: MatDialog) { }

   ngOnInit() {
    this.talkStory({data: this.story , song: this.videoId, startTime: 70 }).then();
    this.audioControlService.isDisable = true;
    this.audioControlService.ready$.subscribe(status => {
      console.log(status, 'status');
      if (status === 0) {
        this.resetCompleteBoard();
        this.isComplete = false;
        if (!!this.storyList.length) {
          this.talkStory(this.storyList.pop()).then();
        }
      }
    });
  }
  async talkStory(story) {
    this.videoId = story.song;
    for await ( const i of story.data) {
      await this.timeout(8000);
      this.talk(i, parseInt(story.startTime, 10), story);
    }
  }
  talk(sentence: Sentence, startTime, story) {
    const el = this.renderer.createElement('div');
    this.renderer.addClass(el, 'typewriter-text');
    const te = this.renderer.createText(sentence.text);
    this.renderer.appendChild(el, te);
    this.renderer.appendChild(this.board.nativeElement, el);
    if (sentence.page === sentence.sumPage) {
      this.startMusic(startTime);
      setTimeout(() => {
        this.isComplete = true;
        for (const i of story.data) {
          const ele = this.renderer.createElement('div');
          this.renderer.appendChild(ele, this.renderer.createText(i.text));
          this.renderer.appendChild(this.completeBoard.nativeElement, ele);
        }
      }, 10000);
    }
    setTimeout(() => {
      this.renderer.removeChild(this.board.nativeElement, el);
    }, 7500);
  }

  timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  startMusic(startTime = 0) {
    this.audioControlService.player.seekTo(startTime);
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
    console.log(event);
    this.audioControlService.player = event.target;
  }
  videoState(event) {
    this.audioControlService.setReadyState(event.data);
  }

  createWhisper() {
    const popupRef = this.popup.open(WhisperComponent, {
      width: '480px',
      position: {top: '158px'},
      panelClass: 'whisperOverlay'
    });
    popupRef.afterClosed().subscribe(res => {
      console.log(res);
      console.log('popup close');
      if (res) {
        this.makeStory(res);
      }
    });
  }
  makeStory(whisper) {
    const story: Sentence[] = [];
    story.push({page: 1, sumPage: whisper.sentence.split('\n').length + 1, text: `Dear ${whisper.name}: `});
    whisper.sentence.split('\n').forEach((value, index, array) => {
      story.push( { page: index + 2 , sumPage: array.length + 1 , text: value});
    });
    this.storyList.unshift({data: story, song: whisper.song, startTime: whisper.startTime });
  }

  resetCompleteBoard() {
    const ch = this.completeBoard.nativeElement.childNodes;
    for (const child of ch) {
      this.renderer.removeChild(this.completeBoard.nativeElement, child);
    }
  }
}



