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

  constructor(
    private pageService: PageService
  ) {
  }

  ngOnInit() {
    this.search_selected_item = null;
    this.location_page_types = this.getLocationPageTypes();
    this.link_page_type = this.location_page_types[0];
  }

  private getLocationPageTypes() {
    return this.pageService.getLocationPageTypes();
  }

}