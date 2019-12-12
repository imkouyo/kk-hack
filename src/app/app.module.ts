import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideBarComponent } from './component/slide-bar/slide-bar.component';
import { AudioControlComponent } from './component/audio-control/audio-control.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { SearchPageComponent } from './component/search-page/search-page.component';
import { LibaryPageComponent } from './component/libary-page/libary-page.component';
import { HeaderComponent } from './component/header/header.component';
import { MusicCardComponent } from './component/music-card/music-card.component';
import { SurprisePageComponent } from './component/surprise-page/surprise-page.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material';

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
    SurprisePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
