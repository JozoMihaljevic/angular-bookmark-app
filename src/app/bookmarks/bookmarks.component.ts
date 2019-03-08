import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[];
  filterQuery: string;

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.bookmarkService.getBookmarks().subscribe(data => {
      this.bookmarks = data.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Bookmark;
      }).filter(item => item.visibility === true);
      this.bookmarks.sort((a: Bookmark, b: Bookmark) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  goToSite(url: string) {
    window.open('http://' + url, '_blank');
  }

}
