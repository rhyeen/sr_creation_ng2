import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-relative-page-summary',
  templateUrl: './relative-page-summary.html',
  styleUrls: ['./relative-page-summary.css'],
  inputs: ['show_state', 'page_summary']
})
export class RelativePageSummaryComponent implements OnInit {
  private page_summary;
  private show_state;

  constructor(
  ) {

  }

  ngOnInit() {
  }
}