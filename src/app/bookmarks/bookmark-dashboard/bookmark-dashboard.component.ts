import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/localstorage.service';
import { Bookmark } from '../../shared/bookmark.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookmark-dashboard',
  templateUrl: './bookmark-dashboard.component.html',
  styleUrls: ['./bookmark-dashboard.component.css']
})
export class BookmarkDashboardComponent implements OnInit {
  bookmarkForm: FormGroup;
  bookmarks: Bookmark[];
  bookmark: Bookmark;
  isEdit = true;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getNew();
    this.getAll();
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
      date: new FormControl(this.bookmark.date),
    });
  }

  goToSite(url: string): void {
    window.open('http://' + url, '_blank');
  }

  getAll() {
    this.bookmarks = this.localStorageService.getBookmarks()
      .sort((a: Bookmark, b: Bookmark) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  onDelete(date: Date) {
    if (confirm('Are you sure to delete this record?')) {
      this.localStorageService.deleteBookmark(date);
    }
    this.getAll();
  }

  onSubmit() {
    const data = Object.assign({}, this.bookmarkForm.value);
    this.localStorageService.editBookmark(data);
    this.getAll();
    this.isEdit = true;
  }

  editItem(item: Bookmark) {
    this.bookmark = item;
    this.setForm();
    this.isEdit = false;
  }
}
