import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ArticleService} from '../../services/article.service';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'sr-overview-article',
  templateUrl: './app/components/article/overview-article.html',
  styleUrls: ['./app/components/article/overview-article.css']
})
export class OverviewArticleComponent implements OnInit {
  private article;
  private article_error;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private tagService: TagService,
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
      .switchMap((params: Params) => this.articleService.getArticle(params['id']))
      .subscribe(
        article => this.setArticle(article),
        error => this.article_error = <any>error);
  }

  setArticle(article) {
    this.article = article;
    this.articleService.addTags(this.article, this.tagService);
  }

  /**
   * Will be unset once article is retrieved since it doesn't have a 'is_loading' property.
   */
  setLoading() {
    if (!this.article || !('is_loading' in this.article)) {
      this.article = {};
      this.article['is_loading'] = true;
    }
  }
}