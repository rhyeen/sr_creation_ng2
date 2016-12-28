import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// Add the RxJS Observable operators.
import './rxjs-operators';

import {PageService} from '../services/page.service';
import {TagService} from '../services/tag.service';
import {StateService} from '../services/state.service';
import {BookmarksService} from '../services/bookmarks.service';
import {BreadcrumbService} from '../services/breadcrumb.service';

@Component({
  selector: 'sr-root-container',
  templateUrl: './app/components/root-container.html',
  styleUrls: ['./app/components/root-container.css'],
  providers: [PageService, StateService, BookmarksService, TagService, BreadcrumbService]
})
export class RootContainerComponent implements OnInit {
  private is_page = true;
  private is_article = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private pageService: PageService,
    private tagService: TagService,
    private bookmarksService: BookmarksService,
    private breadcrumbService: BreadcrumbService
  ) {

  }

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        let type = data['type'];
        if (type === 'page') {
          this.setIsPage();
        } else {
          // default:
          this.setIsPage();
        }
      });
  }

  setIsPage() {
    this.resetContainerType();
    this.is_page = true;
  }

  resetContainerType() {
    this.is_page = false;
  }
}