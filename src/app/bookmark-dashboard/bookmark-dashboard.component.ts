import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Actions } from 'src/redux/actions/bookmark-actions';
import { select } from '@angular-redux/store';
import { Bookmarks } from '../../redux/model/bookmarks';
import { Bookmark } from '../../redux/model/bookmarks';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookmark-dashboard',
  templateUrl: './bookmark-dashboard.component.html',
  styleUrls: ['./bookmark-dashboard.component.css']
})
export class BookmarkDashboardComponent implements OnInit {
  @select('bookmarks') public bookmarks$: Observable<Bookmarks>;
  bookmark: Bookmark;
  bookmarks = [];
  bookmarkForm: FormGroup;
  isEdit = true;

  constructor(
    private actions: Actions,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.actions.getBookmarks();
    this.getNew();
    this.bookmarks$.subscribe(res => {
      this.bookmarks = res.bookmarks;
    });
  }

  getNew() {
    this.bookmark = new Bookmark();
    this.setForm();
  }

  setForm() {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.bookmarkForm = this.fb.group({
      id: new FormControl(this.bookmark.id, Validators.required),
      url: new FormControl(this.bookmark.url, [Validators.required, Validators.pattern(reg)]),
      description: new FormControl(this.bookmark.description, Validators.required),
      tags: new FormControl(this.bookmark.tags, Validators.required),
      visibility: new FormControl(this.bookmark.visibility),
    });
  }

  goToSite(url: string): void {
    window.open('http://' + url, '_blank');
  }

  onSubmit() {
    const bookmark = Object.assign({}, this.bookmarkForm.value);
    delete bookmark.id;
    this.actions.updateBookmark(bookmark, this.bookmarkForm.value.id);
    this.isEdit = true;
  }

  editItem(item: Bookmark) {
    this.bookmark = item;
    this.setForm();
    this.isEdit = false;
  }
}
