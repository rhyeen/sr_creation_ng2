import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-relative-pages-sections',
  templateUrl: './app/components/page-modules/relative-pages-sections.html',
  styleUrls: ['./app/components/page-modules/relative-pages-sections.css'],
  inputs: ['relative_pages_sections']
})
export class RelativePagesSectionsComponent implements OnInit {
  private relative_pages_sections;

  constructor(
  ) {

  }

  ngOnInit() {
  }

  getRelativePagesSectionStateKey(page_section_index) {
    return 'relative_pages_section' + page_section_index;
  }
}