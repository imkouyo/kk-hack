import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '@kkbox/kkbox-js-sdk';

@Injectable({
  providedIn: 'root'
})
export class KkHackService {

  ACCESSTOKEN: string;
  api;

  constructor(private httpClient: HttpClient) {
  }

  getToken() {
    this.httpClient.get('/getToken').subscribe(
      token => {
        this.ACCESSTOKEN = token.toString();
        console.log(this.ACCESSTOKEN);
        this.api = new Api(this.ACCESSTOKEN);
      }
    );
  }
  // all playlist
  fetchNewHitsAllPlaylist() {
    this.api.newHitsPlaylistFetcher.fetchAllNewHitsPlaylists().then(data => console.log(data));
  }

  // specific playlist for info by id
  fetchNewHitsAllPlaylistById(id) {
    this.api.newHitsPlaylistFetcher.setPlaylistID('DZrC8m29ciOFY2JAm3').fetchMetadata().then(data => console.log(data));
  }

  // specific playlist for tracker by id
  fetchNewHitsAllPlaylistTrackerById(id) {
    this.api.newHitsPlaylistFetcher.setPlaylistID('DZrC8m29ciOFY2JAm3').fetchTracks().then(data => console.log(data));
  }
  // specific category playlist info
  fetchCategoryPlaylist() {
    this.api.newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz').fetchAlbums().then(data => console.log(data));
  }
  // specific category info
  fetchCategoryPlaylistMetaData() {
    this.api.newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz').fetchMetadata().then(data => console.log(data));
  }

  // all category info
  fetchAllCategoryMetaData() {
    this.api.newReleaseCategoryFetcher.fetchAllNewReleaseCategories().then(data => console.log(data));
  }
  // specific track data by id
  fetchTrackMetaData() {
    this.api.trackFetcher.setTrackID('KpnEGVHEsGgkoB0MBk').fetchMetadata().then(data => console.log(data));
  }
  // text to search
  searchResult() {
    this.api.searchFetcher
      .setSearchCriteria('五月天 好好')
      //  .filter({artist: '五月天'})  track albums artist playlist availableTerritory(region) option use
      .fetchSearchResult().then(data => console.log(data));
  }
  // mood mode
  fetchAllMood() {
    this.api.moodStationFetcher.fetchAllMoodStations().then(data => console.log(data));
  }
  // mood playlist
  fetchMoodMetaData() {
    this.api.moodStationFetcher.setMoodStationID('StGZp2ToWq92diPHS7').fetchMetadata().then(data => console.log(data));
  }

  // all type music
  fetchAllTypeClassify() {
    this.api.genreStationFetcher.fetchAllGenreStations().then(data => console.log(data));
  }
  // specific type playlist data
  fetchClassifyMetaData() {
    this.api.genreStationFetcher.setGenreStationID('TYq3EHFTl-1EOvJM5Y').fetchMetadata().then(data => console.log(data));
  }
  // hot top for classsify
  fetchTopPlaylist() {
    this.api.chartFetcher.fetchCharts().then(data => console.log(data));
  }

  fetchTopPlaylistData() {
    this.api.chartFetcher.setPlaylistID('4mJSYXvueA8t0odsny').fetchTracks().then(data => console.log(data));
  }
  test2() {
    this.api.newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz').fetchMetadata().then(data => console.log(data));
  }



}
