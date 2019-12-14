import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Messages } from '../Interface/Messages';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comment$ = new Subject<Messages>();
  comment = this.comment$.asObservable();
  constructor() { }
  sendComment(message) {
    this.comment$.next(message);
  }

}
