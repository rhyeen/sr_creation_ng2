import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// Add the RxJS Observable operators.
import './rxjs-operators';

import {PageService} from '../services/page.service';
import {ArticleService} from '../services/article.service';
import {TagService} from '../services/tag.service';
import {StateService} from '../services/state.service';
import {BookmarksService} from '../services/bookmarks.service';

@Component({
  selector: 'sr-root-container',
  templateUrl: './app/components/root-container.html',
  styleUrls: ['./app/components/root-container.css'],
  providers: [PageService, ArticleService, StateService, BookmarksService, TagService]
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
    private articleService: ArticleService,
    private bookmarksService: BookmarksService
  ) {

  }

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        let type = data['type'];
        if (type === 'page') {
          this.setIsPage();
        } else if (type === 'article') {
          this.setIsArticle();
        } else {
          this.setIsPage();
        }
      });
  }

  setIsPage() {
    this.resetContainerType();
    this.is_page = true;
  }

  setIsArticle() {
    this.resetContainerType();
    this.is_article = true;
  }

  resetContainerType() {
    this.is_page = false;
    this.is_article = false;
  }
}