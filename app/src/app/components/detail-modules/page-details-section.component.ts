import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sr-page-details-section',
  templateUrl: './page-details-section.html',
  styleUrls: ['./page-details-section.css'],
  inputs: ['page_details_section']
})
export class PageDetailsSectionComponent implements OnInit {
  private page_details_section;
  private hide_details = false;
  private add_detail_enabled = false;
  private is_loading = false;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  togglePageDetails(show_content) {
    this.hide_details = !show_content;
  }

  toggleAddDetail(enabled) {
    this.add_detail_enabled = enabled;
  }

  setDetails(page_details_section) {
    this.add_detail_enabled = false;
    this.is_loading = false;
    this.page_details_section = page_details_section;
  }

  setDetailsLoading() {
    this.is_loading = true;
  }
}