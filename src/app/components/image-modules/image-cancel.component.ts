import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-image-cancel-btn',
  templateUrl: './image-cancel-btn.html',
  styleUrls: ['./image-cancel-btn.css'],
  inputs: ['enable']
})
export class ImageCancelBtnComponent implements OnInit {
  @Output() enabled = new EventEmitter();
  private enable = false;

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