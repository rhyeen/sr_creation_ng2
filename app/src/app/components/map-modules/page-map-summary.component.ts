import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-page-map-summary',
  templateUrl: './page-map-summary.html',
  styleUrls: ['./page-map-summary.css'],
  inputs: ['show_state', 'map_summary']
})
export class PageMapSummaryComponent implements OnInit {
  private map_summary;
  private show_state;

  constructor(
  ) {

  }

  ngOnInit() {
  }
}