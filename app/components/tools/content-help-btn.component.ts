import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-content-help-btn',
  templateUrl: './app/components/tools/content-help-btn.html',
  styleUrls: ['./app/components/tools/content-help-btn.css'],
  inputs: ['state_key']
})
export class ContentHelpBtnComponent implements OnInit {
  private state_key;
  private state_event_key = 'show_help';
  private initial_event_state = false;

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
    this.stateService.editState(this.state_key, this.state_event_key, this.initial_event_state);
  }

  toggleHelp() {
    var state = this.stateService.getState(this.state_key);
    var show_help = state[this.state_event_key];
    show_help = !show_help;
    this.stateService.editState(this.state_key, this.state_event_key, show_help);
  }

}