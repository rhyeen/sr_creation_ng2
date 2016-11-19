import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-relative-pages-sections',
  templateUrl: './app/components/page-modules/relative-pages-sections.html',
  styleUrls: ['./app/components/page-modules/relative-pages-sections.css']
})
export class RelativePagesSectionsComponent implements OnInit {
  private relative_pages_sections;

  constructor(
    private pageService: PageService
  ) {

  }

  ngOnInit() {
    this.relative_pages_sections = this.pageService.getRelativePagesSections();
  }

  getRelativePagesSectionStateKey(page_section_index) {
    return 'relative_pages_section' + page_section_index;
  }
}