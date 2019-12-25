import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../service/search.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit, OnChanges {
  @Input() index: number;
  @Input() data: any;
  colorList = ['pink', 'gblue', 'gbluedark', 'blue', 'purple', 'red', 'yellow', 'orange'];
  imageList = [
    '../../../assets/channel_616.png',
    '../../../assets/channel_617.png',
    '../../../assets/channel_618.png',
    '../../../assets/channel_619.png',
    '../../../assets/channel_620.png',
    '../../../assets/channel_621.png',
    '../../../assets/channel_622.png',
    '../../../assets/channel_623.png',
    '../../../assets/channel_624.png',
    '../../../assets/channel_625.png'
    ];
  constructor(private router: Router, private searchService: SearchService) { }
  ngOnInit() {
  }
  ngOnChanges(): void {
  }
  selectMood() {
    let r = '';
    this.data.name.split(' ').forEach(text => r = r.concat(text));
    this.router.navigate(['/search', r], {queryParams: {id: this.data.id}});

  }


}
