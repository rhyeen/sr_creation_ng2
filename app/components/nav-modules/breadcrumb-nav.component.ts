import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../services/breadcrumb.service';

@Component({
  selector: 'sr-breadcrumb-nav',
  templateUrl: './app/components/nav-modules/breadcrumb-nav.html',
  styleUrls: ['./app/components/nav-modules/breadcrumb-nav.css']
})
export class BreadcrumbNavComponent implements OnInit {
  private breadcrumbs_container;

  constructor(
    private breadcrumbService: BreadcrumbService
  ) {

  }

  ngOnInit() {
    this.breadcrumbs_container = this.breadcrumbService.getBreadCrumbsContainer();
  }

}