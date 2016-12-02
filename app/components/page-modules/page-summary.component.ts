import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sr-page-summary',
  templateUrl: './app/components/page-modules/page-summary.html',
  styleUrls: ['./app/components/page-modules/page-summary.css'],
  inputs: ['page_summary', 'page_id']
})
export class PageSummaryComponent implements OnInit {
  private page_summary;
  private page_id;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    
  }

  viewArticle() {
    this.router.navigate(['/article', this.page_id]);
  }
}