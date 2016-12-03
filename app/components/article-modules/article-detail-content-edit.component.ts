import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-article-detail-content-edit',
  templateUrl: './app/components/article-modules/article-detail-content-edit.html',
  styleUrls: ['./app/components/article-modules/article-detail-content-edit.css'],
  inputs: ['content_container', 'content_key', 'edit_state_key']
})
export class ArticleDetailContentEditComponent implements OnInit {
  private content_container;
  private content_key;
  private edit_state_key;
  private edit_state;
  private textarea_height;

  constructor(
    private stateService: StateService
  ) {
  }

  ngOnInit() {
    this.edit_state = this.stateService.getState(this.edit_state_key);
  }
}