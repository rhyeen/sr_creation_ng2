import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'sr-add-image',
  templateUrl: './add-image.html',
  styleUrls: ['./add-image.css'],
  inputs: ['show_state']
})
export class AddImageComponent implements OnInit {
  @Output() setImages = new EventEmitter();
  @Output() setImagesLoading = new EventEmitter();
  private show_state;
  private error;
  private name;
  private add_image_btn = 'Link';
  private file = null;
  private thumbnail = null;
  private image_link = null;
  private thumbnail_link = null;

  constructor(
    private pageService: PageService,
    private fileService: FileService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.resetImage();
    this.file = null;
  }

  cancel() {
    this.show_state = false;
  }

  resetImage() {
    this.name = null;
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
    let name = this.name;
    if (!name) {
      name = 'New image';
    }
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
    this.pageService.newImage(this.name, this.image_link, this.thumbnail_link, page_id)
      .subscribe(
        results => this.reloadPage(),
        error => this.error = <any>error);
  }

  private linkImage() {
    debugger;
  }

  private setLoading() {
    this.setImagesLoading.emit();
  }

  private reloadPage() {
    this.resetImage();
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