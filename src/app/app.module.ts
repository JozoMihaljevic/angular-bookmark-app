import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { DataFilterPipe } from './shared/data-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, IAppState } from '../redux/store';
import { Actions } from 'src/redux/actions/bookmark-actions';
import { environment } from 'src/environments/environment';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkDashboardComponent } from './bookmarks/bookmark-dashboard/bookmark-dashboard.component';
import { BookmarkAddComponent } from './bookmarks/bookmark-add/bookmark-add.component';

@NgModule({
  declarations: [
    AppComponent,
    DataFilterPipe,
    BookmarksComponent,
    BookmarkDashboardComponent,
    BookmarkAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgReduxModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [Actions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension
  ) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as IAppState,
      [],
      [this.devTool.isEnabled() ? this.devTool.enhancer() : f => f]
    );

  }
}
