import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-relative-pages',
  templateUrl: './app/views/page-modules/relative-pages.html',
  styleUrls: ['./app/styles/clean-tone/page-modules/relative-pages.css'],
  inputs: ['state_key', 'pages', 'parent_index']
})
export class RelativePagesComponent implements OnInit {
  private pages;
  private parent_index;
  private state_key;
  private state;

  constructor(
    private stateService: StateService,
    private pageService: PageService
  ) {

  }

  ngOnInit() {
    this.state = this.stateService.getState(this.state_key);
  }

  selectPage(page) {
  }

  getRelativePageStateKey(page_section_index, page_index) {
    return 'relative_page_' + page_section_index + '_' + page_index;
  }
}