import {Component, OnInit, ElementRef} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'sr-remove-btn',
  templateUrl: './app/components/tools/remove-btn.html',
  styleUrls: ['./app/components/tools/remove-btn.css'],
  inputs: ['show_state_key'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class RemoveBtnComponent implements OnInit {
  private show_state_key;
  private show_state = false;
  private show_confirmation = false;

  constructor(
    private stateService: StateService,
    private _eref: ElementRef
  ) {

  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.show_confirmation = false;
    }
  }

  ngOnInit() {
    this.show_state = this.stateService.getState(this.show_state_key);
  }

  askRemoveItem() {
    this.show_confirmation = true;
  }

  cancel() {
    this.show_confirmation = false;
  }

  removeItem() {
    // @TODO: notify parent directive
  }

}