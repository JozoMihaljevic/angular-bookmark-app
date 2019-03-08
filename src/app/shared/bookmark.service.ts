import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  bookmarkForm: Bookmark;

  constructor(private firestore: AngularFirestore) { }

  getBookmarks() {
    return this.firestore.collection('bookmarks').snapshotChanges();
  }
}
