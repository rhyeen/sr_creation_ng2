import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'sr-relative-pages',
  templateUrl: './relative-pages.html',
  styleUrls: ['./relative-pages.css'],
  inputs: ['pages', 'show_state', 'is_loading']
})
export class RelativePagesComponent implements OnInit {
  @Output() setRelativePagesSections = new EventEmitter();
  private pages;
  private is_loading;
  private options_btn_config = {
    remove_btn: {
      text: 'Remove Link'
    },
    moved_left: true
  };
  private show_state;
  private page_link_bag;
  private error;

  constructor(
    private pageService: PageService,
    private router: Router,
    private dragulaService: DragulaService
  ) {
    this.page_link_bag = this.generateRandomString();
    dragulaService.setOptions(this.page_link_bag, {
      moves: function (el, container, handle) {
        return handle.className.indexOf('move-btn') != -1;
      }
    });
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
  }

  private onDropModel(args) {
    debugger;
    let [el, target, source] = args;
    // @TODO: may have to determine if this is the pages section that triggered the drop model event.
    this.pageService.reorderPageLinks(this.pages)
      .subscribe(
        data => {},
        error => this.error = <any>error);
  }

  generateRandomString() {
    let string_size = 5;
    let hash = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < string_size; i++) {
      hash += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return hash;
  }

  ngOnInit() {
    
  }

  selectPage(page) {
    this.router.navigate(['/page', page.id]);
  }

  deletePageLink(page) {
    this.setLoading();
    this.pageService.deletePageLink(page, this.pages)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
  }

  private setLoading() {
    this.is_loading = true;
  }

  private reloadPage() {
    let page_id = this.pageService.getPageId();
    this.pageService.getPage(page_id)
      .subscribe(
        data => this.passSetRelativePagesSections(data),
        error => this.error = <any>error);
  }

  private passSetRelativePagesSections(page) {
    this.is_loading = false;
    this.pageService.addPageStates(page);
    this.setRelativePagesSections.emit(page.pages);
  }

  contentHelpEnabled(enabled, page) {
    page._states['help_enabled'] = enabled;
  }
}