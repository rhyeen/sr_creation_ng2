import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-add-link',
  templateUrl: './add-link.html',
  styleUrls: ['./add-link.css'],
  inputs: ['show_state', 'relative_pages_section']
})
export class AddLinkComponent implements OnInit {
  @Output() setRelativePagesSection = new EventEmitter();
  @Output() setRelativePagesSections = new EventEmitter();
  private show_state;
  private error;
  private name;
  private add_link_btn;
  private relative_pages_section;
  private search_selected_item = null;

  constructor(
    private pageService: PageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.switchToAddBtn();
  }

  searchQueryItemSelected(search_item) {
    this.search_selected_item = search_item;
    if (search_item) {
      this.switchToUpdateBtn();
      this.name = search_item.name;
    }
  }

  private switchToAddBtn() {
    this.add_link_btn = 'Add';
  }

  private switchToUpdateBtn() {
    this.add_link_btn = 'Link';
  }

  removeSelection() {
    this.search_selected_item = null;
    this.switchToAddBtn();
  }

  cancel() {
    this.removeSelection();
    this.show_state = false;
  }

  linkOrCreatePage() {
    if (this.shouldAddPage()) {
      this.newPage();
    } else {
      this.addPageLink();
    }
  }

  private shouldAddPage() {
    return this.add_link_btn == 'Add';
  }

  private addPageLink() {
    let links = [];
    if (this.relative_pages_section && this.relative_pages_section.properties && this.relative_pages_section.properties.list) {
      links = this.relative_pages_section.properties.list;
    }
    let link = this.search_selected_item;
    this.setLoading();
    this.pageService.addPageLink(link, links)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
    this.cancel();
  }

  private setLoading() {
    this.relative_pages_section['is_loading'] = true;
    this.passSetRelativePagesSection(this.relative_pages_section);
  }

  private passSetRelativePagesSection(relative_pages_section) {
    this.setRelativePagesSection.emit(relative_pages_section);
  }

  private reloadPage() {
    let page_id = this.pageService.getPageId();
    this.pageService.getPage(page_id)
      .subscribe(
        data => this.passSetRelativePagesSections(data),
        error => this.error = <any>error);
  }

  private passSetRelativePagesSections(page) {
    this.pageService.addPageStates(page);
    this.setRelativePagesSections.emit(page.pages);
  }

  private newPage() {
    let name = this.name;
    if (!name) {
      name = 'New page';
    }
    let type = this.relative_pages_section.type;
    let parent_page_id = this.pageService.getPageId();
    this.pageService.newPage(name, type, parent_page_id)
      .subscribe(
        page_id => this.redirectToPage(page_id),
        error => this.error = <any>error);
    this.cancel();
  }

  private redirectToPage(page_id) {
    this.router.navigate(['/page', page_id]);
  }
}