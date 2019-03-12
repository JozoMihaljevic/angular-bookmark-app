import { Component, OnInit } from '@angular/core';
import { Actions } from 'src/redux/actions/bookmark-actions';
import { select } from '@angular-redux/store';
import { Bookmarks } from 'src/redux/model/bookmarks';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  @select('bookmarks') public bookmarks$: Observable<Bookmarks>;
  bookmarks = [];

  constructor(private actions: Actions) {
  }

  ngOnInit() {
    this.actions.getBookmarks();
    this.bookmarks$.subscribe(res => {
      this.bookmarks = res.bookmarks.filter(item => item.visibility === true);
    });
  }

  goToSite(url: string): void {
    window.open('http://' + url, '_blank');
  }

}
