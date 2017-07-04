import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-page-maps-section',
  templateUrl: './page-maps-section.html',
  styleUrls: ['./page-maps-section.css'],
  inputs: ['page_maps_section']
})
export class PageMapsSectionComponent implements OnInit {
  private page_maps_section;
  private hide_maps = false;
  private add_map_enabled = false;
  private is_loading = false;

  constructor(
  ) {

  }

  ngOnInit() {
  }

  togglePageMaps(show_content) {
    this.hide_maps = !show_content;
  }

  toggleAddMap(enabled) {
    this.add_map_enabled = enabled;
  }

  setMaps(page_maps_section) {
    this.add_map_enabled = false;
    this.is_loading = false;
    this.page_maps_section = page_maps_section;
  }

  setMapsLoading() {
    this.is_loading = true;
  }
}