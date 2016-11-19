import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-page-title',
  templateUrl: './app/components/page-modules/page-title.html',
  styleUrls: ['./app/components/page-modules/page-title.css']
})
export class PageTitleComponent implements OnInit {
  private page_title;

  constructor(
    private pageService: PageService
  ) {

  }

  ngOnInit() {
    this.page_title = this.pageService.getPageTitle();
  }

}