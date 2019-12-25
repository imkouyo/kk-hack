import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '@kkbox/kkbox-js-sdk';
import {BehaviorSubject, from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KkHackService {

  private token: string;
  private api;
  private isReady = new BehaviorSubject<boolean>(false);
  public  isReady$ = this.isReady.asObservable();
  constructor(private httpClient: HttpClient) {
  }

  getToken() {
    this.httpClient.get('/getToken').subscribe(
      token => {
        this.token = token.toString();
        console.log(this.token);
        this.api = new Api(this.token);
        this.isReady.next(true);
      }
    );
  }
  // all playlist
  fetchNewHitsAllPlaylist() {
    return from( this.api.newHitsPlaylistFetcher.fetchAllNewHitsPlaylists());
  }
  // specific playlist for info by id
  fetchNewHitsAllPlaylistById(id) {
    return from( this.api.newHitsPlaylistFetcher.setPlaylistID('DZrC8m29ciOFY2JAm3').fetchMetadata());
  }
  // specific playlist for tracker by id
  fetchNewHitsAllPlaylistTrackerById(id) {
    return from( this.api.newHitsPlaylistFetcher.setPlaylistID('DZrC8m29ciOFY2JAm3').fetchTracks());
  }
  // specific category playlist info
  fetchCategoryPlaylist() {
    return from( this.api.newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz').fetchAlbums());
  }
  // specific category info
  fetchCategoryPlaylistMetaData() {
    return from( this.api.newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz').fetchMetadata());
  }

  // all category info
  fetchAllCategoryMetaData() {
    return from( this.api.newReleaseCategoryFetcher.fetchAllNewReleaseCategories());
  }
  // specific track data by id
  fetchTrackMetaData() {
    return from( this.api.trackFetcher.setTrackID('KpnEGVHEsGgkoB0MBk').fetchMetadata());
  }
  // text to search
  searchResult(target) {
    return from( this.api.searchFetcher
      .setSearchCriteria(target)
      //  .filter({artist: '五月天'})  track albums artist playlist availableTerritory(region) option use
      .fetchSearchResult());
  }
  // mood mode
  fetchAllMood() {
    return from( this.api.moodStationFetcher.fetchAllMoodStations());
  }
  // mood playlist
  fetchMoodMetaData(id) {
    return from( this.api.moodStationFetcher.setMoodStationID(id).fetchMetadata());
  }
  // all type music
  fetchAllTypeClassify() {
    return from( this.api.genreStationFetcher.fetchAllGenreStations());
  }
  // specific type playlist data
  fetchClassifyMetaData() {
    return from( this.api.genreStationFetcher.setGenreStationID('TYq3EHFTl-1EOvJM5Y').fetchMetadata());
  }
  // hot top for classsify
  fetchTopPlaylist() {
    return from( this.api.chartFetcher.fetchCharts());
  }
  fetchTopPlaylistData(id) {
    return from( this.api.chartFetcher.setPlaylistID(id).fetchTracks());
  }
}
