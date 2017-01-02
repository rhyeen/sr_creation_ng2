import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-section-toggle-btn',
  templateUrl: './app/components/tools/section-toggle-btn.html',
  styleUrls: ['./app/components/tools/section-toggle-btn.css']
})
export class SectionToggleBtnComponent implements OnInit {
  @Output() enabled = new EventEmitter();
  private enable = true;

  constructor(
  ) {

  }

  ngOnInit() {
  }

  toggleSection() {
    this.enable = !this.enable;
    this.enabled.emit(this.enable);
  }

}