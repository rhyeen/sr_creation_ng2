import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-breadcrumb-nav',
  templateUrl: './app/components/nav-modules/breadcrumb-nav.html',
  styleUrls: ['./app/components/nav-modules/breadcrumb-nav.css']
})
export class BreadcrumbNavComponent implements OnInit {
  private breadcrumbs_container;

  constructor(
    private pageService: PageService
  ) {

  }

  ngOnInit() {
    this.breadcrumbs_container = this.pageService.getBreadCrumbsContainer();
  }

}