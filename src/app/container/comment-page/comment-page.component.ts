import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { Messages } from '../../Interface/Messages';
import { AudioControlService } from '../../service/audio-control.service';
import {Sentence} from "../../Interface/Sentence";
import {WhisperComponent} from "../../component/whisper/whisper.component";
import {MatDialog} from "@angular/material/dialog";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit, OnDestroy {
  videoSync = this.socket.fromEvent('video information');
  @ViewChild('commentBoard', {static: true }) elementRef;
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
  stopSubscribe = new Subject<boolean>();
  constructor(private renderer: Renderer2,
              private commentService: CommentService,
              private audioControlService: AudioControlService,
              private popup: MatDialog,
              private socket: Socket,
  ) { }
  ngOnInit() {
    this.videoSync.subscribe(value => console.log(value, '123'));
    this.audioControlService.isDisable = false;
    this.commentService.comment.pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe( (comment) => this.insert(comment));
    if (!!this.audioControlService.player) {
      this.talkStory({data: this.story , song: this.videoId, startTime: 70 }).then();
    }
    this.audioControlService.ready$.pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(status => {
      if (status === 99 ) {
        this.talkStory({data: this.story , song: this.videoId, startTime: 70 }).then();
      }
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

  insert(message) {
    const cmt = this.createComment(message);
    this.renderer.appendChild(this.elementRef.nativeElement, cmt);
    setTimeout(() => {
      this.renderer.removeChild(this.elementRef.nativeElement, cmt);
    } , 15000);
  }
  createComment(message: Messages) {
    const randomHeight = Math.floor(Math.random() * 550);
    const cmt = this.renderer.createElement('div');
    this.renderer.addClass(cmt, 'cmt');
    this.renderer.setAttribute(cmt, 'color', message.color);
    this.renderer.setStyle(cmt, 'top', `${randomHeight}px`);
    const textEle = this.renderer.createText(message.text);
    this.renderer.appendChild(cmt, textEle);
    return cmt;
  }

  async talkStory(story) {
    this.audioControlService.player.cueVideoById(story.song)
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

  createWhisper() {
    const popupRef = this.popup.open(WhisperComponent, {
      width: '480px',
      position: {},
      panelClass: 'whisperOverlay'
    });
    popupRef.afterClosed().pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(res => {
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
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }

}
