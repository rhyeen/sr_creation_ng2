import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-relative-pages',
  templateUrl: './app/components/page-modules/relative-pages.html',
  styleUrls: ['./app/components/page-modules/relative-pages.css'],
  inputs: ['state_key', 'pages', 'parent_index']
})
export class RelativePagesComponent implements OnInit {
  private pages;
  private parent_index;
  private state_key;
  private state;

  constructor(
    private stateService: StateService,
    private pageService: PageService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.state = this.stateService.getState(this.state_key);
  }

  selectPage(page) {
    this.router.navigate(['/page', page.id]);
  }

  getRelativePageStateKey(page_section_index, page_index) {
    return 'relative_page_' + page_section_index + '_' + page_index;
  }
}