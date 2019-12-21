import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KkHttpClientService {

  private userCode =  new BehaviorSubject<string>('');
  public  userCode$ = this.userCode.asObservable();
  // tslint:disable-next-line:variable-name
  private _accessToken;
  BaseURL = 'https://api.kkbox.com/v1.1/me';
  option
  constructor(private http: HttpClient) { }

  set ACCESSTOKEN(token) {
    this._accessToken = token;

  }
  get ACCESSTOKEN() {
    return this._accessToken;
  }
  accessToken(codeId) {
    return this.http.get('/getClientToken', { params: {
      id: codeId
      }});
  }
  setUserCode(id) {
    this.userCode.next(id);
  }
  getClientData() {
    this.option = { headers: { Authorization: `Bearer ${this._accessToken}`} };
    return this.http.get(this.BaseURL, this.option);
  }
  getClientDaily(limit) {
    return this.http.get(`${this.BaseURL}/daily-recommended-tracks?limit=${limit}`, this.option);
  }
  getClientAllPlaylist(limit) {
    return this.http.get(`${this.BaseURL}/playlists?limit=${limit}`, this.option);
  }
  getClientPlaylist(id) {
    return this.http.get(`${this.BaseURL}/playlists/${id}`, this.option);
  }

}
