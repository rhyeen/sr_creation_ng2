import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PageService} from '../../../services/page.service';

@Component({
  selector: 'sr-edit-basic-pin-properties',
  templateUrl: './edit-basic-pin-properties.html',
  styleUrls: ['./edit-basic-pin-properties.css'],
  inputs: ['pin']
})
export class EditBasicPinProperties implements OnInit {
  private pin;
  private location_page_types;
  private linked_page_name;
  private search_selected_item;
  private pin_link_type_container;

  constructor(
    private pageService: PageService
  ) {
  }

  ngOnInit() {
    this.search_selected_item = null;
    this.location_page_types = this.getLocationPageTypes();
    if (!this.pin.title) {
      this.pin.title = {
        name: null
      };
    }
    if (!this.pin.tooltip) {
      this.pin.tooltip = {
        text: null
      };
    }
    if (!this.pin.link) {
      this.pin.link = {
        id: null,
        name: null,
        type: this.location_page_types[0].code
      };
      this.pin_link_type_container = this.location_page_types[0].code;
    } else {
      this.pin_link_type_container = this.getLocationPageType(this.pin.link.type, this.location_page_types);
      this.search_selected_item = {
        id: this.pin.link.id,
        name: this.pin.link.name
      };
    }
    this.skipBasicPinProperties();
  }

  /**
   * @DEBUG: For debugging only to skip this model.
   */
  private skipBasicPinProperties() {
    setTimeout(_ => {
      this.pin.title = 'Test title';
      this.pin.tooltip = 'Test tooltip';
      this.pin._state.set_basic_properties = true;
    });
  }

  private getLocationPageType(code, location_page_types) {
    if (!code) {
      return location_page_types[0];
    }
    for (let location_page_type of location_page_types) {
      if (location_page_type.code == code) {
        return location_page_type;
      }
    }
  }

  private getLocationPageTypes() {
    return this.pageService.getLocationPageTypes();
  }

  searchQueryItemSelected(search_item) {
    this.search_selected_item = search_item;
    if (search_item) {
      this.pin.link.name = search_item.name;
      this.linked_page_name = search_item.name;
      this.pin.link.id = search_item.id;
    } else {
      this.pin.link.name = null;
      this.linked_page_name = null;
      this.pin.link.id = null;
    }
  }

  removeSelection() {
    this.search_selected_item = null;
  }

  selectLinkPageType(link_page_type) {
    this.pin_link_type_container = link_page_type;
    this.pin.link.type = link_page_type.code;
    this.search_selected_item = null;
  }

  newPin() {
    this.pin._state.set_basic_properties = true;
  }
}