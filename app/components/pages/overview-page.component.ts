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
    // @NOTE: it works, but it's in the digest cycle in such a way where we never see the spinner, unless it takes some time to load.  Probably an intentional featuer for NG2
    this.router.events.subscribe(path => {
      this.setLoading();
    });
    this.setLoading();
    this.route.params
      .switchMap((params: Params) => this.pageService.getPage(params['page_type'], params['id'], params['library']))
      .subscribe(
        page => this.page = page,
        error => this.page_error = <any>error);
  }

  /**
   * Will be unset once page is retrieved since it doesn't have a 'is_loading' property.
   */
  setLoading() {
    if (!this.page || !('is_loading' in this.page)) {
      this.page = {};
      this.page['is_loading'] = true;
    }
  }
}