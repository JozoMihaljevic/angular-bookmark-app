import { Injectable } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';

@Injectable()
export class LocalStorageService {
  bookmark: Bookmark;
  bookmarks: Bookmark[];

  constructor() {
    this.bookmarks = this.getBookmarks();
  }

  public addBookmark(bookmark: Bookmark): void {
    this.bookmark = new Bookmark();
    this.bookmarks = this.getBookmarks();
    this.bookmarks.push(bookmark);
    this.setLocalStorage(this.bookmarks);
  }

  public getBookmarks(): Bookmark[] {
    const localStorageItem = JSON.parse(localStorage.getItem('bookmarks'));
    return localStorageItem == null ? [] : localStorageItem.bookmarks;
  }

  public editBookmark(bookmark: Bookmark): void {
    this.bookmarks = this.getBookmarks();
    for (let i = 0; i < this.bookmarks.length; i++) {
      if (this.bookmarks[i].date === bookmark.date) {
        this.bookmarks[i] = bookmark;
      }
    }
    this.setLocalStorage(this.bookmarks);
  }

  public deleteBookmark(date: Date): void {
    this.bookmarks = this.getBookmarks();
    for (let i = 0; i < this.bookmarks.length; i++) {
      if (this.bookmarks[i].date === date) {
        this.bookmarks.splice(i, 1);
      }
    }
    this.setLocalStorage(this.bookmarks);
  }

  private setLocalStorage(bookmarks: Bookmark[]): void {
    localStorage.setItem('bookmarks', JSON.stringify({ bookmarks: bookmarks }));
  }
}
