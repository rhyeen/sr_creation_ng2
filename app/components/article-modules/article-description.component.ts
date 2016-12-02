import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sr-article-description',
  templateUrl: './app/components/article-modules/article-description.html',
  styleUrls: ['./app/components/article-modules/article-description.css'],
  inputs: ['article_description', 'article_id']
})
export class ArticleDescriptionComponent implements OnInit {
  private article_description;
  private article_id;
  private state_key = 'article_details';

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    
  }

  getStateKey() {
    return this.state_key;
  }
}