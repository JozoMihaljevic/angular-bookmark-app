import { Injectable } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';

@Injectable()
export class LocalStorageService {
  nextId: number;
  maxId: number;
  bookmark: Bookmark;
  bookmarks: Bookmark[];

  constructor() {
    this.bookmarks = this.getBookmarks();

    // if no todos, nextId is 0,
    // otherwise set to 1 more than last todo id
    if (this.bookmarks.length === 0) {
      this.nextId = 0;
    } else {
      this.maxId = this.bookmarks[this.bookmarks.length - 1].id;
      this.nextId = this.maxId + 1;
    }
  }

  public addTodo(bookmark: Bookmark): void {
    this.bookmark = new Bookmark();
    this.bookmarks = this.getBookmarks();
    this.bookmarks.push(bookmark);

    // save the todos to local storage
    this.setLocalStorage(this.bookmarks);
    this.nextId++;
  }

  public getBookmarks(): Bookmark[] {
    const localStorageItem = JSON.parse(localStorage.getItem('bookmarks'));
    return localStorageItem == null ? [] : localStorageItem.bookmarks;
  }

  public editBookmark(bookmark: Bookmark): void {
    this.bookmarks = this.getBookmarks();
    this.setLocalStorage(this.bookmarks);
  }

  public removeBookmark(id: number): void {
    this.bookmarks = this.getBookmarks();
    this.bookmarks = this.bookmarks.filter((item) => item.id !== id);
    this.setLocalStorage(this.bookmarks);
  }

  // private function to help save to local storage
  private setLocalStorage(bookmarks: Bookmark[]): void {
    localStorage.setItem('bookmarks', JSON.stringify({ bookmarks: bookmarks }));
  }
}
