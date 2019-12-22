import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './container/home-page/home-page.component';
import { SearchPageComponent } from './container/search-page/search-page.component';
import { SurprisePageComponent } from './container/surprise-page/surprise-page.component';
import { CommentPageComponent } from './container/comment-page/comment-page.component';
import { LibraryPageComponent } from './container/library-page/library-page.component';
import { MoodPlaylistComponent } from './container/mood-playlist/mood-playlist.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent},
  { path: 'search/:type', component: MoodPlaylistComponent },
  { path: 'surprise', component: SurprisePageComponent },
  { path: 'comment-video', component: CommentPageComponent },
  { path: 'kk-auth', component: LibraryPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
