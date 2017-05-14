import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-magnify-image-btn',
  templateUrl: './magnify-image-btn.html',
  styleUrls: ['./magnify-image-btn.css'],
  inputs: ['link']
})
export class MagnifyImageBtnComponent implements OnInit {
  @Output() enabled = new EventEmitter();
  private link;
  
  constructor(
  ) {

  }

  ngOnInit() {
  }

  magnifyImage() {
    this.enable = !this.enable;
    this.enabled.emit(this.enable);
  }
}