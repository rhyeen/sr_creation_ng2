import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-bookmarks-btn',
  templateUrl: './app/components/tools/bookmarks-btn.html',
  styleUrls: ['./app/components/tools/bookmarks-btn.css']
})
export class BookmarksBtnComponent implements OnInit {
  private state_key = 'bookmarks';
  private state_event_key = 'show_bookmarks';

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
  }

  openBookmarks() {
    this.stateService.editState(this.state_key, this.state_event_key, true);
  }

}
