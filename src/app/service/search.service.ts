import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private handleSearchBar = new BehaviorSubject<string>('');
  public handleSearchBar$ = this.handleSearchBar.asObservable();
  constructor() {}

  setCategory(text) {
    this.handleSearchBar.next(text);
  }
}
