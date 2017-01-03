import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'sr-relative-pages',
  templateUrl: './app/components/page-modules/relative-pages.html',
  styleUrls: ['./app/components/page-modules/relative-pages.css'],
  inputs: ['pages', 'show_state', 'is_loading']
})
export class RelativePagesComponent implements OnInit {
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

  getRelativePageStateKey(page_section_index, page_index) {
    return 'relative_page_' + page_section_index + '_' + page_index;
  }

  deletePageLink(page) {

  }

  contentHelpEnabled(enabled, page) {
    page._states['help_enabled'] = enabled;
  }
}