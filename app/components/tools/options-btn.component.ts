import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-options-btn',
  templateUrl: './app/components/tools/options-btn.html',
  styleUrls: ['./app/components/tools/options-btn.css'],
  inputs: ['state_key']
})
export class OptionsBtnComponent implements OnInit {
  private state_key;
  private state_event_key = 'show_options';
  private initial_event_state = false;
  private state;

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
    this.state = this.initial_event_state;
    this.stateService.editState(this.state_key, this.state_event_key, this.initial_event_state);
  }

  toggleOptions() {
    var global_state = this.stateService.getState(this.state_key);
    var show = global_state[this.state_event_key];
    show = !show;
    this.stateService.editState(this.state_key, this.state_event_key, show);
    this.state = show;
  }

}