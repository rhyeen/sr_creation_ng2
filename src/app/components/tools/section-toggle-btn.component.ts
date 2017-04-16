import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-section-toggle-btn',
  templateUrl: './section-toggle-btn.html',
  styleUrls: ['./section-toggle-btn.css'],
  inputs: ['reverse_toggle']
})
export class SectionToggleBtnComponent implements OnInit {
  @Output() reveal = new EventEmitter();
  private show_content = true;
  private reverse_toggle = false;

  constructor(
  ) {

  }

  ngOnInit() {
    if (this.reverse_toggle) {
      this.show_content = !this.show_content;
    }
  }

  toggleSection() {
    this.show_content = !this.show_content;
    this.reveal.emit(this.show_content);
  }

}