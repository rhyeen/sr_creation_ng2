import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-cancel-image-btn',
  templateUrl: './cancel-image-btn.html',
  styleUrls: ['./cancel-image-btn.css']
})
export class CancelImageBtnComponent implements OnInit {
  @Output() enabled = new EventEmitter();

  constructor(
  ) {

  }

  ngOnInit() {
  }

  cancelImage() {
    this.enable = !this.enable;
    this.enabled.emit(this.enable);
  }
}