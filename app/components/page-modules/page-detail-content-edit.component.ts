import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-page-detail-content-edit',
  templateUrl: './app/components/page-modules/page-detail-content-edit.html',
  styleUrls: ['./app/components/page-modules/page-detail-content-edit.css'],
  inputs: ['content_container', 'content_key', 'edit_state_key']
})
export class PageDetailContentEditComponent implements OnInit {
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