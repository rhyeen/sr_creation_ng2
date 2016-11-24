import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-overview-page',
  templateUrl: './app/components/pages/overview-page.html',
  styleUrls: ['./app/components/pages/overview-page.css'],
  inputs: ['page']
})
export class OverviewPageComponent implements OnInit {
  private page;

  constructor(
  ) {

  }

  ngOnInit() {
  }

}