import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-content-help-btn',
  templateUrl: './content-help-btn.html',
  styleUrls: ['./content-help-btn.css']
})
export class ContentHelpBtnComponent implements OnInit {
  @Output() enabled = new EventEmitter();
  private initial_event_state = false;
  private enable;

  constructor(
  ) {

  }

  ngOnInit() {
    this.enable = this.initial_event_state;
  }

  toggleHelp() {
    this.enable = !this.enable;
    this.enabled.emit(this.enable);
  }

}