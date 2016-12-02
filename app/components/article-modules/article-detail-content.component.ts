import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-article-detail-content',
  templateUrl: './app/components/article-modules/article-detail-content.html',
  styleUrls: ['./app/components/article-modules/article-detail-content.css'],
  inputs: ['state_key', 'detail_content', 'edit_state_key']
})
export class ArticleDetailContentComponent implements OnInit {
  private detail_content;
  private state_key;
  private state;
  private edit_state_key;
  private edit_state;

  constructor(
    private stateService: StateService
  ) {
  }

  ngOnInit() {
    this.state = this.stateService.getState(this.state_key);
    this.edit_state = this.stateService.getState(this.edit_state_key);
  }
}