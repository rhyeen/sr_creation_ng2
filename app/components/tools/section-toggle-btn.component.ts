import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-section-toggle-btn',
  templateUrl: './app/components/tools/section-toggle-btn.html',
  styleUrls: ['./app/components/tools/section-toggle-btn.css'],
  inputs: ['state_key']
})
export class SectionToggleBtnComponent implements OnInit {
  private state_key;
  private state_event_key = 'show_section';
  private initial_event_state = true;

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
    this.stateService.editState(this.state_key, this.state_event_key, this.initial_event_state);
  }

  toggleSection() {
    var state = this.stateService.getState(this.state_key);
    var show_section = state[this.state_event_key];
    show_section = !show_section;
    this.stateService.editState(this.state_key, this.state_event_key, show_section);
  }

}