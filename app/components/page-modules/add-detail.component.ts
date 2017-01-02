import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-add-detail',
  templateUrl: './app/components/page-modules/add-detail.html',
  styleUrls: ['./app/components/page-modules/add-detail.css'],
  inputs: ['show_state']
})
export class AddDetailComponent implements OnInit {
  private show_state;
  private error;
  private name;
  private content;
  private add_detail_btn = 'Add';

  constructor(
    private pageService: PageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.resetContent();
  }

  cancel() {
    this.show_state = false;
  }

  resetContent() {
    this.content = {
    mark_down: null,
    partitions: []
  };
  }

  private newDetail() {
    let name = this.name;
    if (!name) {
      name = 'New detail';
    }
    let content = this.content;
    if (!content) {
      this.resetContent();
      content = this.content;
    }
    let page_id = this.pageService.getPageId();
    this.pageService.newDetail(name, content, page_id)
      .subscribe(
        page_id => this.refreshPage(),
        error => this.error = <any>error);
    this.cancel();
  }

  private refreshPage() {
    // @TODO:
  }
}