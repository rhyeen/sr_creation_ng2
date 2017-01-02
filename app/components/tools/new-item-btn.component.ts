import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-new-item-btn',
  templateUrl: './app/components/tools/new-item-btn.html',
  styleUrls: ['./app/components/tools/new-item-btn.css']
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