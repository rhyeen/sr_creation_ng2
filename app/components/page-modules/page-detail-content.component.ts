import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sr-page-detail-content',
  templateUrl: './app/components/page-modules/page-detail-content.html',
  styleUrls: ['./app/components/page-modules/page-detail-content.css'],
  inputs: ['show_state', 'edit_state', 'content']
})
export class PageDetailContentComponent implements OnInit {
  private content;
  private show_state;
  private edit_state;
  private detail;

  private exit_btn_color = 'black';
  private content_key = 'mark_down';

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  showTag(partition) {
    let page_id = partition.tag.id;
    this.router.navigate(['/page', page_id]);
  }
}