import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'sr-page-details',
  templateUrl: './app/components/page-modules/page-details.html',
  styleUrls: ['./app/components/page-modules/page-details.css'],
  inputs: ['details', 'state_key']
})
export class PageDetailsComponent implements OnInit {
  private details;
  private state_key;
  private state;
  private edit_states;
  private exit_btn_color = 'black';
  private content_key = 'mark_down';

  constructor(
    private stateService: StateService,
    private tagService: TagService
  ) {

  }

  ngOnInit() {
    this.state = this.stateService.getState(this.state_key);
    this.edit_states = this.getAllEditStates();
  }

  renderTags(detail) {
    this.tagService.renderPartitions(detail)
      .subscribe((data) => {
        detail['content'] = data;
      });
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