import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'sr-add-map',
  templateUrl: './add-map.html',
  styleUrls: ['./add-map.css'],
  inputs: ['show_state', 'page_maps_section']
})
export class AddMapComponent implements OnInit {
  @Output() setPageMaps = new EventEmitter();
  private show_state;
  private error;
  private name;
  private add_map_btn;
  private page_maps_section;
  private search_selected_item = null;

  constructor(
    private pageService: PageService,
    private mapService: MapService,
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
    this.add_map_btn = 'Add';
  }

  private switchToUpdateBtn() {
    this.add_map_btn = 'Link';
  }

  removeSelection() {
    this.search_selected_item = null;
    this.switchToAddBtn();
  }

  cancel() {
    this.removeSelection();
    this.show_state = false;
  }

  linkOrCreateMap() {
    if (this.shouldAddMap()) {
      this.newMap();
    } else {
      this.addMapLink();
    }
  }

  private shouldAddMap() {
    return this.add_map_btn == 'Add';
  }

  private addMapLink() {
    let links = [];
    if (this.page_maps_section && this.page_maps_section.properties && this.page_maps_section.properties.list) {
      links = this.page_maps_section.properties.list;
    }
    let link = this.search_selected_item;
    this.setLoading();
    this.pageService.addPageLink(link, links)
      .subscribe(
        data => this.reloadMap(),
        error => this.error = <any>error);
    this.cancel();
  }

  private setLoading() {
    this.page_maps_section['is_loading'] = true;
  }

  private passSetPageMaps(page) {
    this.pageService.addPageStates(page);
    this.setPageMaps.emit(page.maps);
  }

  private reloadMap() {
    let page_id = this.pageService.getPageId();
    this.pageService.getPage(page_id)
      .subscribe(
        data => this.passSetPageMaps(data),
        error => this.error = <any>error);
  }

  private newMap() {
    let name = this.name;
    if (!name) {
      name = 'New map';
    }
    let parent_page_id = this.pageService.getPageId();
    this.mapService.createMap(name, parent_page_id)
      .subscribe(
        map_id => this.redirectToMap(map_id),
        error => this.error = <any>error);
    this.cancel();
  }

  private redirectToMap(map_id) {
    this.router.navigate(['/map', map_id]);
  }
}