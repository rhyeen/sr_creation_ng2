import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-page-summary',
  templateUrl: './app/components/page-modules/page-summary.html',
  styleUrls: ['./app/components/page-modules/page-summary.css'],
  inputs: ['page_summary']
})
export class PageSummaryComponent implements OnInit {
  private page_summary;

  constructor(
  ) {

  }

  ngOnInit() {
    
  }
}