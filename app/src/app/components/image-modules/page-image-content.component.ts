import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileService} from '../../services/file.service';

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
  private image_link;
  private thumbnail_link;
  private exit_btn_color = 'black';
  private content_key = 'mark_down';

  private source_is_link = false;

  constructor(
    private router: Router,
    private fileService: FileService
  ) {
  }

  magnifyImage() {
    // managed by the link
  }

  ngOnInit() {
    this.source_is_link = this.isLink(this.content.source);
    this.image_link = this.generateImageLink(this.content.link);
    this.thumbnail_link = this.generateThumbnailLink(this.content.thumbnail.link);
  }

  private isLink(possible_link) {
    if (!possible_link) {
      return false;
    }
    return this.isUrl(possible_link);
  }

  /**
   * SOURCE: https://mathiasbynens.be/demo/url-regex
   *         https://gist.github.com/dperini/729294
   * AUTHOR: @diegoperini
   */
  private isUrl(str) {
    var regex = new RegExp(
      "^" +
        // protocol identifier
        "(?:(?:https?|ftp)://)" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
          // IP address exclusion
          // private & local networks
          "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
          "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
          "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
          // IP address dotted notation octets
          // excludes loopback network 0.0.0.0
          // excludes reserved space >= 224.0.0.0
          // excludes network & broacast addresses
          // (first & last IP address of each class)
          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
          // host name
          "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
          // domain name
          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
          // TLD identifier
          "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
          // TLD may end with dot
          "\\.?" +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:[/?#]\\S*)?" +
      "$", "i"
    );
    return regex.test(str);
  }

  private generateImageLink(link) {
    return this.fileService.getImageUrl(link);
  }

  private generateThumbnailLink(link) {
    return this.fileService.getThumbnailUrl(link);
  }
}