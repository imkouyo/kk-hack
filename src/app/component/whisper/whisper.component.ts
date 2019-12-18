import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-whisper',
  templateUrl: './whisper.component.html',
  styleUrls: ['./whisper.component.scss']
})
export class WhisperComponent implements OnInit {
  faTimes = faTimes;
  whisperForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public popupRef: MatDialogRef<WhisperComponent>) {
    this.whisperForm = this.formBuilder.group({
      name: '',
      song: '',
      startTime: '0',
      sentence: '',
    });
  }

  ngOnInit() {
  }
  createWhisper(data) {
    this.popupRef.close(data);
  }
  closePopup() {
    this.popupRef.close();
  }

}
