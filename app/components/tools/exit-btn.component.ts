import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-exit-btn',
  templateUrl: './app/components/tools/exit-btn.html',
  styleUrls: ['./app/components/tools/exit-btn.css'],
  inputs: ['state_key', 'state_event_key', 'color']
})
export class ExitBtnComponent implements OnInit {
  private state_key;
  private state_event_key;
  private color;

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
    
  }

  exit() {
    this.stateService.editState(this.state_key, this.state_event_key, false);
  }

}