import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-edit-btn',
  templateUrl: './edit-btn.html',
  styleUrls: ['./edit-btn.css'],
  inputs: ['config']
})
export class EditBtnComponent implements OnInit {
  @Output() edit = new EventEmitter();
  private config;

  constructor(
  ) {

  }

  ngOnInit() {
    if (!this.config) {
      this.config = {};
    }
  }

  editItem() {
    this.edit.emit();
  }
}