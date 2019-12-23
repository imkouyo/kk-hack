import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() playlistData;
  ngOnInit() {
  }
  selectPlaylist() {
    this.router.navigate(['/user-playlist'], {queryParams: {id: this.playlistData.id}});

  }

}
