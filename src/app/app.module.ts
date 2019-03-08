import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkService } from './shared/bookmark.service';
import { LocalStorageService } from './shared/localstorage.service';
import { environment } from 'src/environments/environment';
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [BookmarkService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
