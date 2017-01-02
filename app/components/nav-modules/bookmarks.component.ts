import {Component, OnInit, ElementRef} from '@angular/core';
import {BookmarksService} from '../../services/bookmarks.service';

@Component({
  selector: 'sr-bookmarks',
  templateUrl: './app/components/nav-modules/bookmarks.html',
  styleUrls: ['./app/components/nav-modules/bookmarks.css'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class BookmarksComponent implements OnInit {
  private bookmarks;
  private click_counter;
  private show_bookmarks = false;

  constructor(
    private bookmarksService: BookmarksService,
    private _eref: ElementRef
  ) {

  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      if (this.click_counter > 0) {
        this.closeBookmarks();
      }
      this.click_counter++;
    }
  }

  closeBookmarks() {
    this.click_counter = 0;
    this.show_bookmarks = false;
  }

  openBookmarks() {
    this.click_counter = 0;
    this.show_bookmarks = true;
  }

  ngOnInit() {
    this.bookmarks = this.bookmarksService.getBookmarks();
  }

  openBookmark(bookmark_index) {

  }

  openEvents() {

  }

  openRulebooks() {

  }

  openReferenceTables() {

  }

  openWiki() {
    
  }

}