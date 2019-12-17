import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-whisper',
  templateUrl: './whisper.component.html',
  styleUrls: ['./whisper.component.scss']
})
export class WhisperComponent implements OnInit {
  faTimes = faTimes
  constructor() { }

  ngOnInit() {
  }

}
