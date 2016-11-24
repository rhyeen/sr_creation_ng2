import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// Add the RxJS Observable operators.
import './rxjs-operators';

import {PageService} from '../services/page.service';
import {StateService} from '../services/state.service';
import {BookmarksService} from '../services/bookmarks.service';

@Component({
  selector: 'sr-root-container',
  templateUrl: './app/components/root-container.html',
  styleUrls: ['./app/components/root-container.css'],
  providers: [PageService, StateService, BookmarksService]
})
export class RootContainerComponent implements OnInit {
  private page;
  private page_error;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private pageService: PageService,
    private bookmarksService: BookmarksService
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

  goToRoot() {
    this.router.navigate(['/']);
  }
}