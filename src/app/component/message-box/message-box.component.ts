import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {Messages} from '../../Interface/Messages';
import { CommentService } from '../../service/comment.service';
import {Socket} from "ngx-socket-io";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit, OnDestroy {
  faPaperPlane = faPaperPlane;
  chatBox = this.socket.fromEvent('chat message');
  @ViewChild('content', {static: true}) contentEle;
  text: string;
  messages: Messages[] = [];
  colorMap = ['yellow', 'green', 'blue', 'red', 'orange', 'purple'];
  stopSubscribe = new Subject<boolean>();
  constructor(private commentService: CommentService, private socket: Socket) { }

  ngOnInit() {
    this.chatBox.pipe(takeUntil(this.stopSubscribe.asObservable())).subscribe(value => {
      this.sendMessage(value['message']);
    });
  }
  sendMessage(text) {
      const comment = {timestamp: '1', text: text , color: this.titleColorful()};
      this.messages.push(comment);
      this.commentService.sendComment(comment);
  }
  enterMessage(event) {
    if (event.key === 'Enter' && !!this.text) {
      this.socket.emit('chat message', {message: this.text});
      this.text = '';
      setTimeout(() => this.scrollToBottom() , 200);
    }

  }
  titleColorful() {
    return this.colorMap[Math.floor(Math.random() * 6)];
  }
  scrollToBottom(): void {
    try {
      this.contentEle.nativeElement.scrollTop = this.contentEle.nativeElement.scrollHeight;
    } catch (err) { console.log('error',  err); }
  }
  ngOnDestroy(): void {
    this.stopSubscribe.next(true);
  }
}
