import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-page-summary',
  templateUrl: './app/components/page-modules/page-summary.html',
  styleUrls: ['./app/components/page-modules/page-summary.css'],
  inputs: ['page']
})
export class PageSummaryComponent implements OnInit {
  private page;
  private is_loading;
  private options_btn_config = {
    edit_btn: {
      text: 'Edit Summary'
    },
    remove_btn: {
      text: 'Remove Page'
    }
  };
  private edit_mode = false;
  private error;

  constructor(
    private pageService: PageService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  editSummary() {
    this.edit_mode = true;
  }

  finishEditSummary() {
    this.edit_mode = false;
    this.setLoading();
    let page_id = this.pageService.getPageId();
    this.pageService.updatePageSummary(page_id, this.page.name, this.page.summary)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
  }

  private setLoading() {
    this.is_loading = true;
  }

  private resetLoading() {
    this.is_loading = false;
  }

  private reloadPage() {
    let page_id = this.pageService.getPageId();
    this.pageService.getPage(page_id)
      .subscribe(
        data => this.setSummary(data),
        error => this.error = <any>error);
  }

  private setSummary(page) {
    this.resetLoading();
    this.pageService.addPageStates(page);
    this.page.name = page.name;
    this.page.summary = page.summary;
  }

  deletePage() {
    this.setLoading();
    let page_id = this.pageService.getPageId();
    this.pageService.deletePage(page_id)
      .subscribe(
        data => this.redirectToMainPage(),
        error => this.error = <any>error);
  }

  redirectToMainPage() {
    this.router.navigate(['/page']);
  }
}