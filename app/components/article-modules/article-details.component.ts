import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-article-details',
  templateUrl: './app/components/article-modules/article-details.html',
  styleUrls: ['./app/components/article-modules/article-details.css'],
  inputs: ['details', 'state_key']
})
export class ArticleDetailsComponent implements OnInit {
  private details;
  private state_key;
  private state;
  private edit_states;
  private exit_btn_color = 'black';
  private content_key = 'mark_down';

  constructor(
    private stateService: StateService,
    private pageService: ArticleService
  ) {

  }

  ngOnInit() {
    this.state = this.stateService.getState(this.state_key);
    this.edit_states = this.getAllEditStates();
  }

  getAllEditStates() {
    let edit_states = [];
    for (let i=0; i < this.details.length; i++) {
      let edit_state = this.stateService.getState(this.getEditStateKey(i));
      edit_states.push(edit_state);
    }
    return edit_states;
  }

  getDetailStateKey(index) {
    return this.state_key + index;
  }

  getOptionsStateKey(index) {
    return this.state_key + '_options' + index;
  }

  getMoveStateKey(index) {
    return this.state_key + '_move' + index;
  }

  getEditStateKey(index) {
    return this.state_key + '_edit' + index;
  }

  getEditStateEventKey() {
    return 'edit_enabled';
  }

  getTagRenderStateKey(index) {
    return this.state_key + '_tagrender' + index;
  }

  getTagRenderStateEventKey() {
    return 'tag_rendering_enabled';
  }

  getRemoveStateKey(index) {
    return this.state_key + '_remove' + index;
  }

  getOptionsStateProperty() {
    return 'show_options';
  }
}