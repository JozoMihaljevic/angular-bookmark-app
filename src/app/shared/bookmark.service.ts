import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private firestore: AngularFirestore) { }

  getBookmarks() {
    return this.firestore.collection('bookmarks').snapshotChanges();
  }
}
