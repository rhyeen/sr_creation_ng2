import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-map-options',
  templateUrl: './map-options.html',
  styleUrls: ['./map-options.css'],
  inputs: ['map', 'target_pin']
})
export class MapOptionsComponent implements OnInit {
  private map;
  private opened;
  private target_pin;

  constructor(
  ) {
  }

  ngOnInit() {
    this.opened = false;
    if (!this.target_pin._state) {
      this.target_pin._state = {};
    }
  }

  addPin() {
    this.opened = true;
  }

  closeOptions() {
    this.opened = false;
    this.target_pin._state.set_basic_location = false;
    this.target_pin._state.set_basic_properties = false;
  }

  backToBasicProperties() {
    this.target_pin._state.set_basic_properties = false;
  }

  backToBasicLocation() {
    this.target_pin._state.set_basic_location = false;
  }

  savePin() {
    debugger;
  }
}