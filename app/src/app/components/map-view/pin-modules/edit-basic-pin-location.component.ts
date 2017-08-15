import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-edit-basic-pin-location',
  templateUrl: './edit-basic-pin-location.html',
  styleUrls: ['./edit-basic-pin-location.css'],
  inputs: ['pin'],
  outputs: ['setCancel']
})
export class EditBasicPinLocation implements OnInit {
  private pin;
  private setCancel = new EventEmitter();


  constructor(
  ) {
  }

  ngOnInit() {
  }

  cancel() {
    this.setCancel.emit();
  }

  placePin() {
    this.pin._state.set_basic_location = true;
  }
}