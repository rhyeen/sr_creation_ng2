import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sr-page-image-content',
  templateUrl: './page-image-content.html',
  styleUrls: ['./page-image-content.css'],
  inputs: ['show_state', 'edit_state', 'content']
})
export class PageImageContentComponent implements OnInit {
  private content;
  private show_state;
  private edit_state;
  private image;

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