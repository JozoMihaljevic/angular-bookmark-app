import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { LocalStorageService } from './shared/localstorage.service';
import { BookmarkDashboardComponent } from './bookmarks/bookmark-dashboard/bookmark-dashboard.component';
import { DataFilterPipe } from './shared/data-filter.pipe';
import { BookmarkAddComponent } from './bookmarks/bookmark-add/bookmark-add.component';

@NgModule({
  declarations: [
    AppComponent,
    BookmarksComponent,
    BookmarkDashboardComponent,
    DataFilterPipe,
    BookmarkAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
