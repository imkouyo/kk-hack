import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  API_URL = 'https://www.googleapis.com/youtube/v3/search';
  API_KEY = 'AIzaSyCRJqo_zdv1gDIsSkczJOFTnKcm2coSWEA';
  constructor(private http: HttpClient) {
  }

  searchMusic(target, limit) {
    return this.http.get(`${this.API_URL}?q=${target}&key=${this.API_KEY}&maxResults=${limit}&type=video&part=snippet`);
  }
}
