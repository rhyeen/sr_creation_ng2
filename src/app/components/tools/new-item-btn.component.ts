import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-new-item-btn',
  templateUrl: './new-item-btn.html',
  styleUrls: ['./new-item-btn.css'],
  inputs: ['enable']
})
export class NewItemBtnComponent implements OnInit {
  @Output() enabled = new EventEmitter();
  private enable = false;

  constructor(
  ) {

  }

  ngOnInit() {
  }

  toggleNewItem() {
    this.enable = !this.enable;
    this.enabled.emit(this.enable);
  }
}