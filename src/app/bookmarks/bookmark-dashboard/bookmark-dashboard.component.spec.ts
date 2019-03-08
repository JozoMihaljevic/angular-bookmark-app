import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkDashboardComponent } from './bookmark-dashboard.component';

describe('BookmarkDashboardComponent', () => {
  let component: BookmarkDashboardComponent;
  let fixture: ComponentFixture<BookmarkDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
