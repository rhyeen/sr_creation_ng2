import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-relative-page-summary',
  templateUrl: './app/views/page-modules/relative-page-summary.html',
  styleUrls: ['./app/styles/clean-tone/page-modules/relative-page-summary.css'],
  inputs: ['state_key', 'page_section_index', 'page_index']
})
export class RelativePageSummaryComponent implements OnInit {
  private page_section_index;
  private page_index;
  private page_summary;
  private state_key;
  private state;

  constructor(
    private stateService: StateService,
    private pageService: PageService
  ) {

  }

  ngOnInit() {
    this.page_summary = this.pageService.getPageSummary(this.page_section_index, this.page_index);
    this.state = this.stateService.getState(this.state_key);
  }
}