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

  private source_is_link = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.source_is_link = this.isLink(this.content.source);
  }

  private isLink(possible_link) {
    if (!possible_link) {
      return false;
    }
    return this.isUrl(possible_link);
  }

  /**
   * SOURCE: http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
   * AUTHOR: Zemljoradnik and Diogo Cardoso
   */
  private isUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }
}