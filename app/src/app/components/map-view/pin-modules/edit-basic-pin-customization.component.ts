import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MapService} from '../../../services/map.service';

@Component({
  selector: 'sr-edit-basic-pin-customization',
  templateUrl: './edit-basic-pin-customization.html',
  styleUrls: ['./edit-basic-pin-customization.css'],
  inputs: ['pin'],
  outputs: ['setCancel', 'setSave']
})
export class EditBasicPinCustomization implements OnInit {
  private pin;
  private setCancel = new EventEmitter();
  private setSave = new EventEmitter();
  private pin_theme_container;
  private pin_themes;

  constructor(
    private mapService: MapService
  ) {
  }

  ngOnInit() {
    this.pin_themes = this.getPinThemes();
  }

  private getPinThemes() {
    return this.mapService.getPinThemes();
  }

  cancel() {
    this.setCancel.emit();
  }

  savePin() {
    this.pin._state.set_basic_customization = true;
    this.setSave.emit();
  }

  selectPinTheme(pin_theme) {
    this.pin_theme_container = pin_theme;
    this.pin.theme = pin_theme.theme;
  }
}