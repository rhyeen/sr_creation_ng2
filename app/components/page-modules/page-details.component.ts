import {Component, OnInit} from '@angular/core';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'sr-page-details',
  templateUrl: './app/components/page-modules/page-details.html',
  styleUrls: ['./app/components/page-modules/page-details.css'],
  inputs: ['details', 'show_state']
})
export class PageDetailsComponent implements OnInit {
  private details;

  constructor(
    private tagService: TagService
  ) {

  }

  ngOnInit() {
  }

  renderTags(detail) {
    this.tagService.renderPartitions(detail)
      .subscribe((data) => {
        detail['content'] = data;
      });
  }

  deleteDetail(detail) {

  }

  toggleDetail(enabled, detail) {
    detail._states.hide_detail_content = enabled;
  }
}