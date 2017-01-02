import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-bookmarks-btn',
  templateUrl: './app/components/tools/bookmarks-btn.html',
  styleUrls: ['./app/components/tools/bookmarks-btn.css']
})
export class BookmarksBtnComponent implements OnInit {
  @Output() open = new EventEmitter();

  constructor(
  ) {

  }

  ngOnInit() {
  }

  openBookmarks() {
    this.open.emit();
  }
}
