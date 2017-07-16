import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-exit-btn',
  templateUrl: './exit-btn.html',
  styleUrls: ['./exit-btn.css'],
  inputs: ['color']
})
export class ExitBtnComponent implements OnInit {
  @Output() closed = new EventEmitter();
  private color;

  constructor(
  ) {

  }

  ngOnInit() {
    
  }

  exit(event) {
    this.closed.emit();
  }
}