import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-relative-pages-sections',
  templateUrl: './relative-pages-sections.html',
  styleUrls: ['./relative-pages-sections.css'],
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

  setRelativePagesSection(new_relative_pages_section, relative_pages_section_index) {
    this.relative_pages_sections[relative_pages_section_index] = new_relative_pages_section;
  }

  setRelativePagesSections(new_relative_pages_sections) {
    this.relative_pages_sections = new_relative_pages_sections;
  }
}