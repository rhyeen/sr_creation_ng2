import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {PageService} from '../../services/page.service';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'sr-page-details',
  templateUrl: './app/components/page-modules/page-details.html',
  styleUrls: ['./app/components/page-modules/page-details.css'],
  inputs: ['details']
})
export class PageDetailsComponent implements OnInit {
  @Output() setDetails = new EventEmitter();
  private details;
  private options_btn_config = {
    remove_btn: {
      text: 'Remove Detail'
    },
    edit_btn: {
      text: 'Edit Detail'
    },
    moved_left: true
  };
  private page_detail_bag;
  private error;

  constructor(
    private pageService: PageService,
    private tagService: TagService,
    private dragulaService: DragulaService
  ) {
    this.page_detail_bag = this.generateRandomString();
    dragulaService.setOptions(this.page_detail_bag, {
      moves: function (el, container, handle) {
        return handle.className.indexOf('move-btn') != -1;
      }
    });
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
  }

  private onDropModel(args) {
    let [el, target, source] = args;
    // @TODO: may have to determine if this is the details section or pages section that triggered the drop model event.
    this.pageService.reorderDetails(this.details)
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

  renderTags(detail) {
    this.setLoading();
    this.tagService.renderPartitions(detail)
      .subscribe(
        data => this.updateDetail(data, detail),
        error => this.error = <any>error);
  }

  private updateDetail(data, detail) {
    detail['content'] = data;
    detail._states.edit_enabled = false;
    this.pageService.updateDetail(detail)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
  }

  deleteDetail(detail) {
    this.setLoading();
    this.pageService.deleteDetail(detail)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
  }

  private setLoading() {
    this.details.is_loading = true;
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


  editDetail(detail) {
    detail._states.edit_enabled = true;
  }

  toggleDetail(show_content, detail) {
    detail._states.show_detail_content = show_content;
  }
}