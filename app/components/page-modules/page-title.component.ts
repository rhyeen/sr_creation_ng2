import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-page-title',
  templateUrl: './app/views/page-modules/page-title.html',
  styleUrls: ['./app/styles/clean-tone/page-modules/page-title.css'],
  providers: [PageService]
})
export class PageTitleComponent implements OnInit {
  private page_title;

  constructor(
    private _pageService: PageService
  ) {

  }

  ngOnInit() {
    this.page_title = this._pageService.getPageTitle();
  }

}