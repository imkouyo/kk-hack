import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit, OnChanges {
  @Input() index: number;
  @Input() data: any;
  colorList = ['pink', 'gblue', 'gbluedark', 'blue', 'purple', 'red', 'yellow', 'orange'];
  constructor() { }
  ngOnInit() {
  }
  ngOnChanges(): void {
    console.log(this.data);
  }


}
