import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-bookmarks-btn',
  templateUrl: './app/views/tools/bookmarks-btn.html',
  styleUrls: ['./app/styles/clean-tone/tools/bookmarks-btn.css'],
  providers: [StateService]
})
export class BookmarksBtnComponent implements OnInit {

  constructor(
    private _stateService: StateService
  ) {

  }

  ngOnInit() {
  }

  openBookmarks() {
    // @TODO:
  }

}