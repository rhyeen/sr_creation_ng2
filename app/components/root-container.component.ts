import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// Add the RxJS Observable operators.
import './rxjs-operators';

import {PageService} from '../services/page.service';
import {TagService} from '../services/tag.service';
import {StateService} from '../services/state.service';
import {BookmarksService} from '../services/bookmarks.service';
import {BreadcrumbService} from '../services/breadcrumb.service';
import {DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'sr-root-container',
  templateUrl: './app/components/root-container.html',
  styleUrls: ['./app/components/root-container.css'],
  providers: [PageService, StateService, BookmarksService, TagService, BreadcrumbService, DragulaService]
})
export class RootContainerComponent implements OnInit {
  private is_page = true;
  private is_article = false;
  private show_bookmarks = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private pageService: PageService,
    private tagService: TagService,
    private bookmarksService: BookmarksService,
    private breadcrumbService: BreadcrumbService,
    private dragulaService: DragulaService
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