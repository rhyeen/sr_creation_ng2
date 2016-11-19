import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-page-summary',
  templateUrl: './app/components/page-modules/page-summary.html',
  styleUrls: ['./app/components/page-modules/page-summary.css']
})
export class PageSummaryComponent implements OnInit {
  private page_summary;

  constructor(
    private pageService: PageService
  ) {

  }

  ngOnInit() {
    this.page_summary = this.pageService.getPageSummary();
  }

}