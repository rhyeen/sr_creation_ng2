import {Component, OnInit, ElementRef} from '@angular/core';
import {StateService} from '../../services/state.service';
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
  private state_key = 'bookmarks';
  private state_event_key = 'show_bookmarks';
  private initial_event_state = false;
  private state;
  private bookmarks;
  private click_counter;

  constructor(
    private stateService: StateService,
    private bookmarksService: BookmarksService,
    private _eref: ElementRef
  ) {

  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      if (this.shouldClose()) {
        this.stateService.editState(this.state_key, this.state_event_key, this.initial_event_state);
      }
    }
  }

  ngOnInit() {
    this.resetClickCounter();
    this.bookmarks = this.bookmarksService.getBookmarks();
    this.state = this.stateService.getState(this.state_key);
    this.stateService.editState(this.state_key, this.state_event_key, this.initial_event_state);
  }

  shouldClose() {
    let opened = this.state[this.state_event_key];
    if (opened) {
      this.incrementClickCounter();
      if (this.clickedToClose()) {
        this.resetClickCounter();
        return true;
      }
      return false;
    }
    this.resetClickCounter();
    return false;
  }

  resetClickCounter() {
    this.click_counter = 0;
  }

  incrementClickCounter() {
    this.click_counter++;
  }

  clickedToClose() {
    return this.click_counter > 1;
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