import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  @ViewChild('commentBoard', {static: true }) elementRef;
  text: string;
  demoSentence = ['Ha ha ha ha!', 'It\'s so funny', 'Good job', 'Awesome Girl', 'I like this sound'];
  constructor(private renderer: Renderer2) { }
  ngOnInit() {
  }

  insert() {
      console.log(this.text);
      const randomText = Math.floor(Math.random() * 5);
      const randomHeight = Math.floor(Math.random() * 600);
      const cmt = this.renderer.createElement('div');
      const textEle = !!this.text ? this.renderer.createText(this.text) : this.renderer.createText(this.demoSentence[randomText]);
      this.text = '';
      this.renderer.addClass(cmt, 'cmt');
      this.renderer.setStyle(cmt, 'top', `${randomHeight}px`);
      this.renderer.appendChild(cmt, textEle);
      this.renderer.appendChild(this.elementRef.nativeElement, cmt);
      setTimeout(() => {
        this.renderer.removeChild(this.elementRef.nativeElement, cmt);
      } , 15000);
  }

}
