import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { Messages } from '../../Interface/Messages';
import { AudioControlService } from '../../service/audio-control.service';
import {Sentence} from '../../Interface/Sentence';
import {MatDialog} from '@angular/material/dialog';
import {interval, of, Subject, Subscription} from 'rxjs';
import {delay, switchMap, take, takeUntil, timeout} from 'rxjs/operators';
import {Socket} from 'ngx-socket-io';
import {HttpClient} from '@angular/common/http';
import {WhisperComponent} from '../../component/whisper/whisper.component';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit, OnDestroy {
  videoSync = this.socket.fromEvent('switch music');
  handleNextWhisper = this.socket.fromEvent('handle next');
  @ViewChild('commentBoard', {static: true }) elementRef: ElementRef;
  text: string;
  isComplete = false;
  videoId = 'S_E2EHVxNAE';
  storyList;
  storySub: Subscription;
  isDesktop;
  nextWhisperTip = 'No next Whisper';
  @ViewChild('board', { static: true}) board: ElementRef;
  @ViewChild('completeBoard', { static: true}) completeBoard: ElementRef;
  stopSubscribe = new Subject<boolean>();
  constructor(private renderer: Renderer2,
              private commentService: CommentService,
              private audioControlService: AudioControlService,
              private popup: MatDialog,
              private socket: Socket,
              private http: HttpClient
  ) { }
  ngOnInit() {
    this.isDesktop = document.body.offsetWidth > 720;
    this.audioControlService.setMusicOnPanel(null);
    this.handleNextWhisper.pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(
      res => {
        if (res['nextWhisper']) {
          this.nextWhisperTip = `${res['nextWhisper']['creator']}'s Whisper`;
        }
      }
    );
    this.videoSync.pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(videoDetail => {
      if (videoDetail['nextWhisper']) {
        this.nextWhisperTip = `${videoDetail['nextWhisper']['creator']}'s Whisper`;
      } else {
        this.nextWhisperTip = 'No next Whisper';
      }
      if (this.audioControlService.player) {
        this.audioControlService.player.cueVideoById(videoDetail['videoId']);
        this.audioControlService.player.seekTo(videoDetail['time']);
        this.storyList = videoDetail['story'];
        this.resetCompleteBoard();
        this.storySub.unsubscribe();
        this.storySub = interval(8000).pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(value => {
          this.talk(this.storyList[value], this.storyList);
        });
      }
    });
    this.audioControlService.ready$.pipe(takeUntil(this.stopSubscribe), switchMap(
      state => {
        if (state) {
          return this.http.get('/getVideo');
        } else {
          return of(null);
        }
      })).subscribe(videoDetail => {
        if (videoDetail) {
          if (videoDetail['nextWhisper']) {
            this.nextWhisperTip = `${videoDetail['nextWhisper']['creator']}'s Whisper`;
          } else {
            this.nextWhisperTip = 'No next Whisper';
          }
          this.audioControlService.player.loadVideoById(videoDetail['videoId'], videoDetail['time']);
          this.audioControlService.setAudioCurrentSec(videoDetail['time']);
          this.storyList = videoDetail['story'];
          this.storySub = interval(8000).pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(value => {
            if (value < this.storyList.length) {
              this.talk(this.storyList[value], this.storyList);
            }
          });
          // this.talkStory(videoDetail['story']).then();
        }
      });
    this.audioControlService.isDisable = true;
    this.commentService.comment.pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe( (comment) => this.insert(comment));
  }

  insert(message) {
    const cmt = this.createComment(message);
    this.renderer.appendChild(this.elementRef.nativeElement, cmt);
    setTimeout(() => {
      this.renderer.removeChild(this.elementRef.nativeElement, cmt);
    } , 15000);
  }
  createComment(message: Messages) {
    const randomHeight = Math.floor(Math.random() * (this.elementRef.nativeElement.offsetHeight - 40));
    const cmt = this.renderer.createElement('div');
    this.renderer.addClass(cmt, 'cmt');
    this.renderer.setAttribute(cmt, 'color', message.color);
    this.renderer.setStyle(cmt, 'top', `${randomHeight}px`);
    const textEle = this.renderer.createText(message.text);
    this.renderer.appendChild(cmt, textEle);
    return cmt;
  }

  talk(sentence: Sentence, story) {
    const el = this.renderer.createElement('div');
    this.renderer.addClass(el, 'typewriter-text');
    const te = this.renderer.createText(sentence.text);
    this.renderer.appendChild(el, te);
    this.renderer.appendChild(this.board.nativeElement, el);
    if (sentence.page === sentence.sumPage) {
      setTimeout(() => {
        this.isComplete = true;
        for (const i of story) {
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

  createWhisper() {
    this.popup.open(WhisperComponent, {
      panelClass: 'whisperOverlay',
    });
  }

  resetCompleteBoard() {
    const ch = this.completeBoard.nativeElement.childNodes;
    for (const child of ch) {
      this.renderer.removeChild(this.completeBoard.nativeElement, child);
    }
  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
    this.audioControlService.stop();
  }

}
