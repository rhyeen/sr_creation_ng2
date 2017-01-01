import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-overview-page',
  templateUrl: './app/components/pages/overview-page.html',
  styleUrls: ['./app/components/pages/overview-page.css']
})
export class OverviewPageComponent implements OnInit {
  private page;
  private page_error;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.router.events.subscribe(path => {
      this.setLoading();
    });
    this.setLoading();
    this.route.params
      .switchMap((params: Params) => this.pageService.getPage(params['id']))
      .subscribe(
        page => this.setPage(page),
        error => this.page_error = <any>error);
  }

  /**
   * Will be unset once page is retrieved since the returned obejct doesn't have an 'is_loading' property.
   */
  setLoading() {
    if (!this.page || !('is_loading' in this.page)) {
      this.page = {};
      this.page['is_loading'] = true;
    }
  }

  setPage(page) {
    this.page = page;
    this.pageService.addPageStates(this.page);
    this.pageService.setPageId(page.id);
  }
}