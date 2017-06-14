import {Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-options-btn',
  templateUrl: './options-btn.html',
  styleUrls: ['./options-btn.css'],
  inputs: ['config'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class OptionsBtnComponent implements OnInit {
  @Output() remove = new EventEmitter();
  @Output() edit = new EventEmitter();
  private config;
  private show_options = false;

  constructor(
    private _eref: ElementRef
  ) {
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.show_options = false;
    }
  }

  ngOnInit() {
    if (!this.config) {
      this.config = {};
    }
  }

  toggleOptions() {
    this.show_options = !this.show_options;
  }

  passEdit() {
    this.edit.emit();
  }

  passRemove() {
    this.remove.emit();
  }

}