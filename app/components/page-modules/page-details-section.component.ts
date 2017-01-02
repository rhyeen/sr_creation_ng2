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

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    
  }

  toggleEnabled(enabled) {
    this.hide_details = enabled;
  }
}