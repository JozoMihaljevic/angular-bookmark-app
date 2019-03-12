import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Bookmark } from '../../redux/model/bookmarks';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions } from 'src/redux/actions/bookmark-actions';
import { select } from '@angular-redux/store';
import { Bookmarks } from 'src/redux/model/bookmarks';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookmark-add',
  templateUrl: './bookmark-add.component.html',
  styleUrls: ['./bookmark-add.component.css']
})
export class BookmarkAddComponent implements OnInit {
  bookmarkForm: FormGroup;
  bookmark: Bookmark;
  date = new Date().toISOString();
  @select('bookmarks') public bookmarks$: Observable<Bookmarks>;
  bookmarks = [];

  constructor(
    private fb: FormBuilder,
    private actions: Actions,
  ) { }

  ngOnInit() {
    this.getNew();
  }

  getNew() {
    this.bookmark = new Bookmark();
    this.setForm();
  }

  setForm() {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.bookmarkForm = this.fb.group({
      url: new FormControl(this.bookmark.url, [Validators.required, Validators.pattern(reg)]),
      description: new FormControl(this.bookmark.description, Validators.required),
      tags: new FormControl(this.bookmark.tags, Validators.required),
      visibility: new FormControl(this.bookmark.visibility),
      date: new FormControl(this.date)
    });
  }

  onSubmit() {
    const bookmark = Object.assign({}, this.bookmarkForm.value);
    delete bookmark.id;
    this.actions.addBookmark(bookmark);
    this.setForm();
  }

  resetForm() {
    this.getNew();
  }
}
