import { Injectable } from '@angular/core';
import { IAppState } from '../store/index';
import { NgRedux } from '@angular-redux/store';
import { Bookmark } from '../model/bookmarks';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class Actions {
  static BOOKMARKS_GET = 'BOOKMARKS_GET';
  static BOOKMARKS_ADD = 'BOOKMARKS_ADD';
  static BOOKMARKS_UPDATE = 'BOOKMARKS_UPDATE';
  static BOOKMARKS_DELETE = 'BOOKMARKS_DELETE';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private firestore: AngularFirestore
  ) { }

  getBookmarks() {
    this.firestore.collection('bookmarks').snapshotChanges()
      .subscribe(data => {
        const bookmarks = data.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Bookmark;
        });
        bookmarks.sort((a: Bookmark, b: Bookmark) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.ngRedux.dispatch({
          type: Actions.BOOKMARKS_GET,
          payload: {
            bookmarks
          }
        });
      });
  }

  addBookmark(bookmark: Bookmark): void {
    this.firestore.collection('bookmarks').add(bookmark);
    this.ngRedux.dispatch({
      type: Actions.BOOKMARKS_ADD,
      payload: { bookmark }
    });
  }

  updateBookmark(bookmark: Bookmark) {
    this.firestore.doc('bookmarks/' + bookmark.id).update(bookmark);
    this.ngRedux.dispatch({
      type: Actions.BOOKMARKS_UPDATE,
      payload: { bookmark }
    });
  }

  deleteBookmark(id: string): void {
    if (confirm('Are you sure to delete this record?')) {
      this.firestore.doc('bookmarks/' + id).delete();
      this.ngRedux.dispatch({
        type: Actions.BOOKMARKS_DELETE,
        payload: { id }
      });
    }
  }
}

