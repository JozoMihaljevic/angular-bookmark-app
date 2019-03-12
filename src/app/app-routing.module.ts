import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkDashboardComponent } from './bookmark-dashboard/bookmark-dashboard.component';
import { BookmarkAddComponent } from './bookmark-add/bookmark-add.component';

const appRoutes: Routes = [
  { path: 'default', component: BookmarksComponent },
  { path: 'add', component: BookmarkAddComponent },
  { path: 'dashboard', component: BookmarkDashboardComponent },
  { path: '', redirectTo: '/default', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
