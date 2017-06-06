import {Component, OnInit, ElementRef, OnChanges, Output, EventEmitter} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-search-results',
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.css'],
  inputs: ['search_query_text', 'page_type', 'other_type'],
  host: {
    '(document:click)': 'onClick($event)',
    '[class.active]': 'is_active'
  }
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Output() itemSelected = new EventEmitter();
  private page_type;
  private other_type;
  private item_list;
  private selected_item;
  private search_query_text;
  private is_active;
  private error;

  constructor(
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
    this.is_active = false;
  }

  ngOnChanges(changes) {
    let new_search_query_text = changes.search_query_text.currentValue;
    if (new_search_query_text && new_search_query_text.length > 2 && (!this.selected_item || new_search_query_text != this.selected_item.name)) {
      this.selected_item = null;
      this.showResults();
    }
    if (new_search_query_text != changes.search_query_text.previousValue && !this.selected_item) {
      this.search_query_text = new_search_query_text;
      this.searchRelevantResults();
    }
  }

  searchRelevantResults() {
    if (!this.search_query_text) {
      this.handleNewSearchResults([]);
      return;
    }
    if (this.page_type) {
      this.pageService.searchRelevantPages(this.search_query_text, this.page_type)
        .subscribe(
          results => this.handleNewSearchResults(results),
          error => this.error = <any>error);
    } else if (this.other_type === 'image') {
      this.pageService.searchRelevantImages(this.search_query_text)
        .subscribe(
          results => this.handleNewSearchResults(results),
          error => this.error = <any>error);
    }
    
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
    this.is_active = false;
  }

  showResults() {
    this.is_active = true;
  }

}