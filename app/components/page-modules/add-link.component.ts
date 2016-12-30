import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-add-link',
  templateUrl: './app/components/page-modules/add-link.html',
  styleUrls: ['./app/components/page-modules/add-link.css'],
  inputs: ['state_key', 'relative_pages_section']
})
export class AddLinkComponent implements OnInit {
  private state_key;
  private state;
  private state_event_key = 'new_enabled';
  private error;
  private name;
  private add_link_btn;
  private relative_pages_section;
  private search_selected_item = null;

  constructor(
    private pageService: PageService,
    private stateService: StateService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.switchToAddBtn();
    this.state = this.stateService.getState(this.state_key);
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

  removeSelection(search_item) {
    this.search_selected_item = null;
    this.switchToAddBtn();
  }

  cancel() {
    this.stateService.editState(this.state_key, this.state_event_key, false);
  }

  getSearchResultsShowStateKey() {
    return this.state_key + '_search_results';
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