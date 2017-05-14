import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'sr-add-image',
  templateUrl: './add-image.html',
  styleUrls: ['./add-image.css'],
  inputs: ['show_state', 'page_images_section']
})
export class AddImageComponent implements OnInit {
  @Output() setImages = new EventEmitter();
  @Output() setImagesLoading = new EventEmitter();
  private show_state;
  private page_images_section;
  private error;
  private name;
  private caption;
  private source;
  private add_image_btn = 'Link';
  private file = null;
  private thumbnail = null;
  private image_link = null;
  private thumbnail_link = null;
  private search_selected_item = null;

  constructor(
    private pageService: PageService,
    private fileService: FileService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.resetAll();
  }

  removeSelection() {
    this.search_selected_item = null;
    this.name = null;
    this.setAddImageBtnText();
  }

  cancel() {
    this.show_state = false;
  }

  cancelImage() {
    this.resetImage();
  }

  magnifyImage() {
    // managed by the link
  }

  private resetAll() {
    this.name = null;
    this.source = null;
    this.caption = null;
    this.search_selected_item = null;
    this.resetImage();
  }

  private resetImage() {
    this.file = null;
    this.thumbnail = null;
    this.image_link = null;
    this.thumbnail_link = null;
  }

  fileReady(file_container) {
    this.file = file_container['file'];
    this.thumbnail = file_container['thumbnail'];
    if (!this.name) {
      this.name = file_container['file_name'];
    }
    this.setAddImageBtnText();
  }

  searchQueryItemSelected(search_item) {
    this.search_selected_item = search_item;
    if (search_item) {
      this.setAddImageBtnText();
      this.name = search_item.name;
    }
  }

  private setAddImageBtnText() {
    if (this.file) {
      this.add_image_btn = 'Upload';
    } else {
      this.add_image_btn = 'Link';
    }
  }

  private newImage() {
    if (this.file) {
      this.uploadImage();
    } else {
      this.linkImage();
    }
  }

  private uploadImage() {
    debugger;
    this.setLoading();
    this.fileService.uploadImage(this.file)
      .subscribe(
        results => this.handleImageUploadResults(results),
        error => this.error = <any>error);
    this.cancel();
  }

  private handleImageUploadResults(results) {
    this.image_link = results.file_name;
    this.fileService.uploadThumbnail(this.thumbnail)
      .subscribe(
        results => this.handleThumbnailUploadResults(results),
        error => this.error = <any>error);
  }

  private handleThumbnailUploadResults(results) {
    let page_id = this.pageService.getPageId();
    this.thumbnail_link = results.file_name;
    debugger;
    this.pageService.newImage(this.name, this.caption, this.source, this.image_link, this.thumbnail_link, page_id)
      .subscribe(
        results => this.reloadPage(),
        error => this.error = <any>error);
  }

  private linkImage() {
    debugger;
    let links = [];
    if (this.page_images_section && this.page_images_section.properties && this.page_images_section.properties.list) {
      links = this.page_images_section.properties.list;
    }
    let link = this.search_selected_item;
    this.setLoading();
    this.pageService.addPageLink(link, links)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
    this.cancel();
    // let page_id = this.pageService.getPageId();
    // let name = this.name;
    // let caption = this.search_selected_item.caption;
    // let source = this.search_selected_item.source;
    // let image_link = this.search_selected_item.image_link;
    // let thumbnail_link = this.search_selected_item.thumbnail.link;
    // this.pageService.newImage(name, caption, source, image_link, thumbnail_link, page_id)
    //   .subscribe(
    //     results => this.reloadPage(),
    //     error => this.error = <any>error);
  }

  private setLoading() {
    this.setImagesLoading.emit();
  }

  private reloadPage() {
    this.resetAll();
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
}