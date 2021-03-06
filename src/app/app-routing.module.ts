import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkDashboardComponent } from './bookmarks/bookmark-dashboard/bookmark-dashboard.component';
import { BookmarkAddComponent } from './bookmarks/bookmark-add/bookmark-add.component';

const appRoutes: Routes = [
  { path: 'default', component: BookmarksComponent },
  { path: 'dashboard', component: BookmarkDashboardComponent },
  { path: 'add', component: BookmarkAddComponent },
  { path: '', redirectTo: '/default', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
