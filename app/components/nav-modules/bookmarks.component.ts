import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';
import {BookmarksService} from '../../services/bookmarks.service';

@Component({
  selector: 'sr-bookmarks',
  templateUrl: './app/components/nav-modules/bookmarks.html',
  styleUrls: ['./app/components/nav-modules/bookmarks.css']
})
export class BookmarksComponent implements OnInit {
  private state_key = 'bookmarks';
  private state_event_key = 'show_bookmarks';
  private initial_event_state = false;
  private state;
  private bookmarks;

  constructor(
    private stateService: StateService,
    private bookmarksService: BookmarksService
  ) {

  }

  ngOnInit() {
    this.bookmarks = this.bookmarksService.getBookmarks();
    this.state = this.stateService.getState(this.state_key);
    this.stateService.editState(this.state_key, this.state_event_key, this.initial_event_state);
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