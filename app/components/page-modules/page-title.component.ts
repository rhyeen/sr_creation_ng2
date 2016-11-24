import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-page-title',
  templateUrl: './app/components/page-modules/page-title.html',
  styleUrls: ['./app/components/page-modules/page-title.css'],
  inputs: ['page_title']
})
export class PageTitleComponent implements OnInit {
  private page_title;

  constructor(
  ) {

  }

  ngOnInit() {
  }

}