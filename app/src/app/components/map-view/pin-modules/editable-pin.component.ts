import {Component, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'sr-editable-pin',
  templateUrl: './editable-pin.html',
  styleUrls: ['./editable-pin.css'],
  inputs: ['coordinates']
})
export class EditablePin implements OnInit, OnChanges {
  private coordinates;
  private x;
  private y;

  constructor(
  ) {
  }

  ngOnInit() {
    this.setCoordinates();
  }

  private setCoordinates() {
    this.x = this.coordinates.x;
    this.y = this.coordinates.y;
  }

  ngOnChanges(changes: any) {
    if ('coordinates' in changes) {
      this.setCoordinates();
    }
  }
}