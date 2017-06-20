import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-world-map-btn',
  templateUrl: './world-map-btn.html',
  styleUrls: ['./world-map-btn.css']
})
export class WorldMapBtnComponent implements OnInit {
  @Output() enabled = new EventEmitter();

  constructor(
  ) {

  }

  ngOnInit() {
  }

  viewWorldMap() {
    this.enabled.emit(true);
  }

}