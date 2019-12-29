import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.scss']
})
export class SlideBarComponent implements OnInit{
  faList = faList;
  constructor() { }
  ngOnInit() {

  }


}
