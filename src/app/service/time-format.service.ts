import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeFormatService {

  constructor() { }
  secToMin(sec) {
    return  Math.floor(sec / 60 ).toString();
  }
  secToSec(sec) {
    return (sec % 60) < 10 ? '0' + Math.floor(sec % 60).toString() : Math.floor(sec % 60).toString();
  }
  secToPercentage(currentSec, endSec) {
    return Math.floor((currentSec * 100) / endSec);
  }
  percentageToSec(currentPercentage, endSec) {
    return Math.floor(endSec * currentPercentage / 100);
  }
}
