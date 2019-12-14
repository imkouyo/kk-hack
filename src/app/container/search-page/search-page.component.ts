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

}
