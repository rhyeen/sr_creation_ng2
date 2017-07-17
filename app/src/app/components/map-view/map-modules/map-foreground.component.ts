import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-map-foreground',
  templateUrl: './map-foreground.html',
  styleUrls: ['./map-foreground.css'],
  inputs: ['map', 'target_pin']
})
export class MapForegroundComponent implements OnInit {
  private map;
  private target_pin;
  @Output() refreshMap = new EventEmitter();
  @Output() loading = new EventEmitter();

  constructor(
  ) {

  }

  ngOnInit() {
  }

  setLoading() {
    this.loading.emit();
  }

  setRefresh() {
    this.refreshMap.emit();
  }
}