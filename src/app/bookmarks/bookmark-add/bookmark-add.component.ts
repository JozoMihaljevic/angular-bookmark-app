import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Bookmark } from 'src/app/shared/bookmark.model';
import { LocalStorageService } from 'src/app/shared/localstorage.service';

@Component({
  selector: 'app-bookmark-add',
  templateUrl: './bookmark-add.component.html',
  styleUrls: ['./bookmark-add.component.css']
})
export class BookmarkAddComponent implements OnInit {
  bookmarkForm: FormGroup;
  bookmark: Bookmark;
  date = new Date().toISOString();

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
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
    this.localStorageService.addTodo(this.bookmarkForm.value);
    this.setForm();
  }

  resetForm() {
    this.getNew();
  }
}
