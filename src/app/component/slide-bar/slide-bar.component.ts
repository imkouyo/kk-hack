import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, Renderer2} from '@angular/core';

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.scss']
})
export class SlideBarComponent implements OnInit, AfterViewInit{

  constructor(private renderer: Renderer2) { }
  @ViewChildren('item') components: QueryList<ElementRef>;
  ngOnInit() {

  }
  ngAfterViewInit(): void {
    console.log(this.components);
  }

  switchPage(event) {
    console.log(event);
    //c
  }

}
