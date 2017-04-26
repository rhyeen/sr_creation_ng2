import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {PageService} from '../../services/page.service';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'sr-page-images',
  templateUrl: './page-images.html',
  styleUrls: ['./page-images.css'],
  inputs: ['images']
})
export class PageImagesComponent implements OnInit {
  @Output() setImages = new EventEmitter();
  private images;
  private options_btn_config = {
    remove_btn: {
      text: 'Remove Image'
    },
    edit_btn: {
      text: 'Edit Image'
    },
    moved_left: true
  };
  private page_image_bag;
  private error;

  constructor(
    private pageService: PageService,
    private tagService: TagService,
    private dragulaService: DragulaService
  ) {
    this.page_image_bag = this.generateRandomString();
    dragulaService.setOptions(this.page_image_bag, {
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
    // @TODO: may have to determine if this is the images section or pages section that triggered the drop model event.
    this.pageService.reorderImages(this.images)
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

  renderTags(image) {
    this.setLoading();
    this.tagService.renderPartitions(image)
      .subscribe(
        data => this.updateImage(data, image),
        error => this.error = <any>error);
  }

  private updateImage(data, image) {
    image['content'] = data;
    image._states.edit_enabled = false;
    this.pageService.updateImage(image)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
  }

  deleteImage(image) {
    this.setLoading();
    this.pageService.deleteImage(image)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
  }

  private setLoading() {
    this.images.is_loading = true;
  }

  private reloadPage() {
    let page_id = this.pageService.getPageId();
    this.pageService.getPage(page_id)
      .subscribe(
        data => this.passSetImages(data),
        error => this.error = <any>error);
  }

  private passSetImages(page) {
    this.pageService.addPageStates(page);
    this.setImages.emit(page.images);
  }


  editImage(image) {
    image._states.edit_enabled = true;
  }

  toggleImage(show_content, image) {
    image._states.show_image_content = show_content;
  }
}