import { Injectable } from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService implements HttpParameterCodec{
  API_URL = 'https://www.googleapis.com/youtube/v3/search';
  API_KEY = 'AIzaSyCRJqo_zdv1gDIsSkczJOFTnKcm2coSWEA';
  constructor(private http: HttpClient) {
  }

  searchMusic(target, limit) {
    return this.http.get(`${this.API_URL}?q=${target}&key=${this.API_KEY}&maxResults=${limit}&type=video&part=snippet`);
  }
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
