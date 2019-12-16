import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { Messages } from '../../Interface/Messages';
import { AudioControlService } from '../../service/audio-control.service';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit {
  @ViewChild('commentBoard', {static: true }) elementRef;
  constructor(private renderer: Renderer2,
              private commentService: CommentService,
              private audioControlService: AudioControlService) { }
  ngOnInit() {
    this.audioControlService.isDisable = false;
    this.commentService.comment.subscribe( (comment) => this.insert(comment));
  }

  insert(message) {
    const cmt = this.createComment(message);
    this.renderer.appendChild(this.elementRef.nativeElement, cmt);
    setTimeout(() => {
      this.renderer.removeChild(this.elementRef.nativeElement, cmt);
    } , 15000);
  }
  createComment(message: Messages) {
    const randomHeight = Math.floor(Math.random() * 600);
    const cmt = this.renderer.createElement('div');
    this.renderer.addClass(cmt, 'cmt');
    this.renderer.setAttribute(cmt, 'color', message.color);
    this.renderer.setStyle(cmt, 'top', `${randomHeight}px`);
    const textEle = this.renderer.createText(message.text);
    this.renderer.appendChild(cmt, textEle);
    return cmt;
  }
  videoReady(event) {
    console.log(event);
    this.audioControlService.player = event.target;
    this.audioControlService.setReadyState(99);
  }

  videoState(event) {
    this.audioControlService.audioState(event);
  }
  change() {
    this.audioControlService.player.cueVideoById('t60GbzFW-Ao');
  }
}
