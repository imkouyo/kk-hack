import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './component/home-page/home-page.component';
import {SearchPageComponent} from './component/search-page/search-page.component';
import {SurprisePageComponent} from './component/surprise-page/surprise-page.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent},
  { path: 'surprise', component: SurprisePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
