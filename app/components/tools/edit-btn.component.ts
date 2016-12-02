import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-edit-btn',
  templateUrl: './app/components/tools/edit-btn.html',
  styleUrls: ['./app/components/tools/edit-btn.css'],
  inputs: ['state_key', 'show_state_key']
})
export class EditBtnComponent implements OnInit {
  private state_key;
  private show_state_key;
  private show_state = false;
  private state_event_key = 'edit_enabled';

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
    this.show_state = this.stateService.getState(this.show_state_key);
  }

  editItem() {
    this.stateService.editState(this.state_key, this.state_event_key, true);
  }
}