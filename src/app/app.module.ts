import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideBarComponent } from './component/slide-bar/slide-bar.component';
import { AudioControlComponent } from './component/audio-control/audio-control.component';
import { HomePageComponent } from './container/home-page/home-page.component';
import { SearchPageComponent } from './container/search-page/search-page.component';
import { LibaryPageComponent } from './container/libary-page/libary-page.component';
import { HeaderComponent } from './component/header/header.component';
import { MusicCardComponent } from './component/music-card/music-card.component';
import { SurprisePageComponent } from './container/surprise-page/surprise-page.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MessageBoxComponent } from './component/message-box/message-box.component';
import { CommentPageComponent } from './container/comment-page/comment-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideBarComponent,
    AudioControlComponent,
    HomePageComponent,
    SearchPageComponent,
    LibaryPageComponent,
    HeaderComponent,
    MusicCardComponent,
    SurprisePageComponent,
    MessageBoxComponent,
    CommentPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
