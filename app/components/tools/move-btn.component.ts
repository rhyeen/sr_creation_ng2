import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-move-btn',
  templateUrl: './app/components/tools/move-btn.html',
  styleUrls: ['./app/components/tools/move-btn.css'],
  inputs: ['show_state']
})
export class MoveBtnComponent implements OnInit {
  private show_state;

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
  }

}