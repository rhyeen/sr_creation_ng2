import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sr-page-details-section',
  templateUrl: './app/components/page-modules/page-details-section.html',
  styleUrls: ['./app/components/page-modules/page-details-section.css'],
  inputs: ['page_details_section']
})
export class PageDetailsSectionComponent implements OnInit {
  private page_details_section;
  private hide_details = false;
  private add_detail_enabled = false;

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
    this.page_details_section = page_details_section;
  }
}