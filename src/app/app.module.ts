import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideBarComponent } from './component/slide-bar/slide-bar.component';
import { AudioControlComponent } from './component/audio-control/audio-control.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { SearchPageComponent } from './component/search-page/search-page.component';
import { LibaryPageComponent } from './component/libary-page/libary-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideBarComponent,
    AudioControlComponent,
    HomePageComponent,
    SearchPageComponent,
    LibaryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
