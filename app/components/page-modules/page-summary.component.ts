import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sr-page-summary',
  templateUrl: './app/components/page-modules/page-summary.html',
  styleUrls: ['./app/components/page-modules/page-summary.css'],
  inputs: ['page']
})
export class PageSummaryComponent implements OnInit {
  private page;
  private options_btn_config = {
    edit_btn: {
      text: 'Edit Summary'
    },
    remove_btn: {
      text: 'Remove Page'
    }
  };

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  editSummary() {

  }

  deletePage() {

  }
}