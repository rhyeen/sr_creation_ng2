import {Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-remove-btn',
  templateUrl: './app/components/tools/remove-btn.html',
  styleUrls: ['./app/components/tools/remove-btn.css'],
  inputs: ['config'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class RemoveBtnComponent implements OnInit {
  @Output() remove = new EventEmitter();
  private show_confirmation = false;
  private config;

  constructor(
    private _eref: ElementRef
  ) {

  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.show_confirmation = false;
    }
  }

  ngOnInit() {
    if (!this.config) {
      this.config = {};
    }
  }

  askRemoveItem() {
    this.show_confirmation = true;
  }

  cancel() {
    this.show_confirmation = false;
  }

  removeItem() {
    this.remove.emit();
  }

}