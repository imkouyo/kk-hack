import { Component, OnInit } from '@angular/core';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  faPaperPlane = faPaperPlane;
  text: string;
  constructor() { }

  ngOnInit() {
  }

  sendMessage() {

  }
}
