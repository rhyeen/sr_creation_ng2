import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-add-detail',
  templateUrl: './add-detail.html',
  styleUrls: ['./add-detail.css'],
  inputs: ['show_state']
})
export class AddDetailComponent implements OnInit {
  @Output() setDetails = new EventEmitter();
  @Output() setDetailsLoading = new EventEmitter();
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
    this.setLoading();
    this.pageService.newDetail(name, content, page_id)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
    this.cancel();
  }

  private setLoading() {
    this.setDetailsLoading.emit();
  }

  private reloadPage() {
    let page_id = this.pageService.getPageId();
    this.pageService.getPage(page_id)
      .subscribe(
        data => this.passSetDetails(data),
        error => this.error = <any>error);
  }

  private passSetDetails(page) {
    this.pageService.addPageStates(page);
    this.setDetails.emit(page.details);
  }
}