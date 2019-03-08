import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { LocalStorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[];
  filterQuery: string;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.bookmarks = this.localStorageService.getBookmarks()
      .filter(item => item.visibility === true)
      .sort((a: Bookmark, b: Bookmark) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  goToSite(url: string) {
    window.open('http://' + url, '_blank');
  }

}
