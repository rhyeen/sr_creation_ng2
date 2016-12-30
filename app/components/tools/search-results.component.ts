import {Component, OnInit, ElementRef, OnChanges, Output, EventEmitter} from '@angular/core';
import {StateService} from '../../services/state.service';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-search-results',
  templateUrl: './app/components/tools/search-results.html',
  styleUrls: ['./app/components/tools/search-results.css'],
  inputs: ['search_query_text', 'show_state_key', 'page_type'],
  host: {
    '(document:click)': 'onClick($event)',
    '[class.active]': 'is_active'
  }
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Output() itemSelected = new EventEmitter();
  private page_type;
  private item_list;
  private selected_item;
  private search_query_text;
  private show_state_key;
  private show_state;
  private show_state_event_key = 'search_results_enabled';
  private initial_show_state = false;
  private is_active;
  private error;

  constructor(
    private stateService: StateService,
    private pageService: PageService,
    private _eref: ElementRef
  ) {

  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.hideResults();
    }
  }

  ngOnInit() {
    this.show_state = this.stateService.getState(this.show_state_key);
    this.stateService.editState(this.show_state_key, this.show_state_event_key, this.initial_show_state);
    this.is_active = this.initial_show_state;
  }

  ngOnChanges(changes) {
    let new_search_query_text = changes.search_query_text.currentValue;
    if (new_search_query_text && new_search_query_text.length > 2 && (!this.selected_item || new_search_query_text != this.selected_item.name)) {
      this.selected_item = null;
      this.showResults();
    }
    if (new_search_query_text != changes.search_query_text.previousValue && !this.selected_item) {
      this.search_query_text = new_search_query_text;
      this.searchRelevantPages();
    }
  }

  searchRelevantPages() {
    this.pageService.searchRelevantPages(this.search_query_text, this.page_type)
      .subscribe(
        results => this.handleNewSearchResults(results),
        error => this.error = <any>error);
  }

  handleNewSearchResults(results) {
    this.item_list = results;
    this.showResults();
  }

  selectItem(search_item) {
    this.selected_item = search_item;
    this.itemSelected.emit(this.selected_item);
    this.hideResults();
  }

  hideResults() {
    this.stateService.editState(this.show_state_key, this.show_state_event_key, false);
    this.is_active = false;
  }

  showResults() {
    this.stateService.editState(this.show_state_key, this.show_state_event_key, true);
    this.is_active = true;
  }

}