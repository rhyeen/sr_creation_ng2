import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-map-options',
  templateUrl: './map-options.html',
  styleUrls: ['./map-options.css'],
  inputs: ['map']
})
export class MapOptionsComponent implements OnInit {
  private map;
  private opened;

  constructor(
  ) {
  }

  ngOnInit() {
    this.opened = false;
  }

  addPin() {
    this.opened = true;
  }

  closeOptions() {
    this.opened = false;
  }
}