import { Component, OnInit } from '@angular/core';
import {faAngleLeft, faAngleRight, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  constructor() { }

  ngOnInit() {
  }

}
