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
  private title;
  private linked_page_name;
  private link_page_type;
  private search_selected_item;
  private tooltip_container;

  constructor(
    private pageService: PageService
  ) {
  }

  ngOnInit() {
    // only needed for sr-textarea.  If we switch all these properites to be within a pin object, the tooltip_container can just be the pin object.
    this.tooltip_container = {
      tooltip: ''
    };
    this.search_selected_item = null;
    this.location_page_types = this.getLocationPageTypes();
    this.link_page_type = this.location_page_types[0];
  }

  private getLocationPageTypes() {
    return this.pageService.getLocationPageTypes();
  }

  searchQueryItemSelected(search_item) {
    this.search_selected_item = search_item;
    if (search_item) {
      this.linked_page_name = search_item.name;
    }
  }

  removeSelection() {
    this.search_selected_item = null;
  }

  selectLinkPageType(link_page_type) {
    this.link_page_type = link_page_type;
    this.search_selected_item = null;
  }
}