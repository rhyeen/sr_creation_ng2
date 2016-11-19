import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-new-item-btn',
  templateUrl: './app/views/tools/new-item-btn.html',
  styleUrls: ['./app/styles/clean-tone/tools/new-item-btn.css'],
  providers: [StateService]
})
export class NewItemBtnComponent implements OnInit {

  constructor(
    private _stateService: StateService
  ) {

  }

  ngOnInit() {
  }

  newItem() {
    // @TODO:
  }

}