import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-relative-pages-sections',
  templateUrl: './app/components/page-modules/relative-pages-sections.html',
  styleUrls: ['./app/components/page-modules/relative-pages-sections.css'],
  inputs: ['relative_pages_sections']
})
export class RelativePagesSectionsComponent implements OnInit {
  private relative_pages_sections;
  private error;

  constructor(
  ) {

  }

  ngOnInit() {
  }

  toggleRelativePages(show_content, relative_pages_section) {
    relative_pages_section._states['hide_relative_pages'] = !show_content;
  }

  toggleAddLink(enabled, relative_pages_section) {
    relative_pages_section._states['add_link_enabled'] = enabled;
  }
}