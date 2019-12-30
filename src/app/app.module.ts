import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideBarComponent } from './component/slide-bar/slide-bar.component';
import { AudioControlComponent } from './component/audio-control/audio-control.component';
import { HomePageComponent } from './container/home-page/home-page.component';
import { SearchPageComponent } from './container/search-page/search-page.component';
import { HeaderComponent } from './component/header/header.component';
import { MusicCardComponent } from './component/music-card/music-card.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatDialogModule,
  MatExpansionModule,
  MatInputModule,
  MatSliderModule,
  MatTabsModule, MatTooltipModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessageBoxComponent } from './component/message-box/message-box.component';
import { CommentPageComponent } from './container/comment-page/comment-page.component';
import { HttpClientModule } from '@angular/common/http';
import { WhisperComponent } from './component/whisper/whisper.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { CategoryCardComponent } from './component/category-card/category-card.component';
import { LibraryPageComponent } from './container/library-page/library-page.component';
import { KkOauthComponent } from './component/kk-oauth/kk-oauth.component';
import { MoodPlaylistComponent } from './container/mood-playlist/mood-playlist.component';
import { UserInfoComponent } from './container/user-info/user-info.component';
import { DailyRecommendComponent } from './container/daily-recommend/daily-recommend.component';
import { UserPlaylistComponent } from './container/user-playlist/user-playlist.component';
import { PlaylistCardComponent } from './component/playlist-card/playlist-card.component';
import { UserPlaylistResultComponent } from './container/user-playlist-result/user-playlist-result.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import { SearchResultCardComponent } from './component/search-result-card/search-result-card.component';
import { SearchPlaylistCardComponent } from './component/search-playlist-card/search-playlist-card.component';
import { StepFormComponent } from './component/step-form/step-form.component';
import { WhisperMusicCardComponent } from './component/whisper-music-card/whisper-music-card.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
const config: SocketIoConfig = { url: 'http://ableave.com', options: {}};
// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {}};
@NgModule({
  declarations: [
    AppComponent,
    SlideBarComponent,
    AudioControlComponent,
    HomePageComponent,
    SearchPageComponent,
    HeaderComponent,
    MusicCardComponent,
    MessageBoxComponent,
    CommentPageComponent,
    WhisperComponent,
    CategoryCardComponent,
    LibraryPageComponent,
    KkOauthComponent,
    MoodPlaylistComponent,
    UserInfoComponent,
    DailyRecommendComponent,
    UserPlaylistComponent,
    PlaylistCardComponent,
    UserPlaylistResultComponent,
    SearchResultCardComponent,
    SearchPlaylistCardComponent,
    StepFormComponent,
    WhisperMusicCardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    NgxSpinnerModule,
    SocketIoModule.forRoot(config),
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [WhisperComponent, KkOauthComponent]
})
export class AppModule { }
