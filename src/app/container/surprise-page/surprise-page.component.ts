import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {Sentence} from '../../Interface/Sentence';

@Component({
  selector: 'app-surprise-page',
  templateUrl: './surprise-page.component.html',
  styleUrls: ['./surprise-page.component.scss']
})
export class SurprisePageComponent implements OnInit {
  text: string;
  story: Sentence[] = [
    { page: 1, sumPage: 3, text: 'Did you see this?'},
    { page: 2, sumPage: 3, text: 'Are you ready to attend KKBox hack-thon!!'},
    { page: 3, sumPage: 3, text: 'I Have new Idea for like this.'}
  ]
  ;
  @ViewChild('board', { static: true}) board: ElementRef;
  constructor(private renderer: Renderer2) { }
  async ngOnInit() {
    this.text = 'Hi Owen!!';
    for await ( const i of this.story) {
      await this.timeout(5000);
      this.talk(i);
    }
  }
  talk(sentence: Sentence) {
    const el = this.renderer.createElement('div');
    this.renderer.addClass(el, 'typewriter-text');
    const te = this.renderer.createText(sentence.text);
    this.renderer.appendChild(el, te);
    this.renderer.appendChild(this.board.nativeElement, el);
  }

  timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }



