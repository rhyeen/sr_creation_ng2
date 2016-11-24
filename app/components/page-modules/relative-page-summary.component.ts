import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-relative-page-summary',
  templateUrl: './app/components/page-modules/relative-page-summary.html',
  styleUrls: ['./app/components/page-modules/relative-page-summary.css'],
  inputs: ['state_key', 'page_summary']
})
export class RelativePageSummaryComponent implements OnInit {
  private page_summary;
  private state_key;
  private state;

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
    this.state = this.stateService.getState(this.state_key);
  }
}