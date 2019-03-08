import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../shared/bookmark.service';
import { Bookmark } from '../../shared/bookmark.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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
    private bookmarkService: BookmarkService,
    private firestore: AngularFirestore) { }

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
      id: new FormControl(this.bookmark.id),
      url: new FormControl(this.bookmark.url, [Validators.required, Validators.pattern(reg)]),
      description: new FormControl(this.bookmark.description, Validators.required),
      tags: new FormControl(this.bookmark.tags, Validators.required),
      visibility: new FormControl(this.bookmark.visibility),
    });
  }

  goToSite(url: string): void {
    window.open('http://' + url, '_blank');
  }

  getAll() {
    this.bookmarkService.getBookmarks()
      .subscribe(data => {
        this.bookmarks = data.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Bookmark;
        });
        console.log(this.bookmarks);
        this.bookmarks.sort((a: Bookmark, b: Bookmark) => new Date(b.date).getTime() - new Date(a.date).getTime());
        console.log(this.bookmarks);
      });

  }

  onCancel() {
    this.isEdit = true;
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.firestore.doc('bookmarks/' + id).delete();
    }
  }

  onSubmit() {
    console.log(this.bookmarkForm.status);
    console.log(this.bookmarkForm.value);
    const data = Object.assign({}, this.bookmarkForm.value);
    delete data.id;
    this.firestore.doc('bookmarks/' + this.bookmarkForm.value.id).update(data);
    this.isEdit = true;
  }

  editItem(item: Bookmark) {
    console.log(item);
    this.bookmark = item;
    console.log(this.bookmark);
    this.setForm();
    this.isEdit = false;
  }
}
