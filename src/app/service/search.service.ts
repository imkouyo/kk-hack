import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private handleCategory = new BehaviorSubject<string>('');
  public handleCategory$ = this.handleCategory.asObservable();
  constructor() {}

  setCategory(id) {
    this.handleCategory.next(id);
  }
}
