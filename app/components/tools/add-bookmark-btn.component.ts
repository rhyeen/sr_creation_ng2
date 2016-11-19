import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-add-bookmark-btn',
  templateUrl: './app/components/tools/add-bookmark-btn.html',
  styleUrls: ['./app/components/tools/add-bookmark-btn.css']
})
export class AddBookmarkBtnComponent implements OnInit {

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
  }

  addBookmark() {
    // @TODO:
  }

}