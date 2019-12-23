import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './container/home-page/home-page.component';
import { SearchPageComponent } from './container/search-page/search-page.component';
import { CommentPageComponent } from './container/comment-page/comment-page.component';
import { LibraryPageComponent } from './container/library-page/library-page.component';
import { MoodPlaylistComponent } from './container/mood-playlist/mood-playlist.component';
import { UserInfoComponent } from './container/user-info/user-info.component';
import { UserPlaylistComponent } from './container/user-playlist/user-playlist.component';
import { DailyRecommendComponent } from './container/daily-recommend/daily-recommend.component';
import { UserPlaylistResultComponent } from './container/user-playlist-result/user-playlist-result.component';


const routes: Routes = [
  { path: 'home', component: CommentPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'hot-list', component: HomePageComponent },
  { path: 'search/:type', component: MoodPlaylistComponent },
  { path: 'comment-video', component: CommentPageComponent },
  { path: 'kk-auth', component: LibraryPageComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'user-all-playlist', component: UserPlaylistComponent },
  { path: 'daily-recommend', component: DailyRecommendComponent },
  { path: 'user-playlist', component: UserPlaylistResultComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
