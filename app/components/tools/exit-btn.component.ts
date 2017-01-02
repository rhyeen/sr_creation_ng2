import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-exit-btn',
  templateUrl: './app/components/tools/exit-btn.html',
  styleUrls: ['./app/components/tools/exit-btn.css'],
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

  exit() {
    this.closed.emit();
  }
}