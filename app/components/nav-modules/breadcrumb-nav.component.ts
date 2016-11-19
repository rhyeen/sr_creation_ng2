import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-breadcrumb-nav',
  templateUrl: './app/views/nav-modules/breadcrumb-nav.html',
  styleUrls: ['./app/styles/clean-tone/nav-modules/breadcrumb-nav.css'],
  providers: [PageService]
})
export class BreadcrumbNavComponent implements OnInit {
  private breadcrumbs;

  constructor(
    private _pageService: PageService
  ) {

  }

  ngOnInit() {
    this.breadcrumbs = this._pageService.getBreadCrumbs();
  }

}