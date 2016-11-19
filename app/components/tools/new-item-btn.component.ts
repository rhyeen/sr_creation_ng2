import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-new-item-btn',
  templateUrl: './app/components/tools/new-item-btn.html',
  styleUrls: ['./app/components/tools/new-item-btn.css']
})
export class NewItemBtnComponent implements OnInit {

  constructor(
    private stateService: StateService
  ) {

  }

  ngOnInit() {
  }

  newItem() {
    // @TODO:
  }

}