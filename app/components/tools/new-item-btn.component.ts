import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-new-item-btn',
  templateUrl: './app/components/tools/new-item-btn.html',
  styleUrls: ['./app/components/tools/new-item-btn.css'],
  inputs: ['state_key']
})
export class NewItemBtnComponent implements OnInit {
  private state_key;
  private state_event_key = 'new_enabled';
  private state;

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
    this.state = this.stateService.getState(this.state_key);
  }

  toggleNewItem() {
    if (this.state.new_enabled) {
      this.cancel();
    } else{
      this.newItem();
    }
  }

  newItem() {
    this.stateService.editState(this.state_key, this.state_event_key, true);
  }

  cancel() {
    this.stateService.editState(this.state_key, this.state_event_key, false);
  }

}