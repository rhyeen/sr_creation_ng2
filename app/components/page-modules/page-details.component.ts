import {Component, OnInit} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'sr-page-details',
  templateUrl: './app/components/page-modules/page-details.html',
  styleUrls: ['./app/components/page-modules/page-details.css'],
  inputs: ['details']
})
export class PageDetailsComponent implements OnInit {
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

  constructor(
    private tagService: TagService,
    private dragulaService: DragulaService
  ) {
    dragulaService.setOptions('detail-bag', {
      moves: function (el, container, handle) {
        return handle.className.indexOf('move-btn') != -1;
      }
    });
  }

  ngOnInit() {
  }

  renderTags(detail) {
    this.tagService.renderPartitions(detail)
      .subscribe((data) => {
        detail['content'] = data;
        detail._states.edit_enabled = false;
      });
  }

  deleteDetail(detail) {
  }

  editDetail(detail) {
    detail._states.edit_enabled = true;
  }

  toggleDetail(show_content, detail) {
    detail._states.show_detail_content = show_content;
  }
}