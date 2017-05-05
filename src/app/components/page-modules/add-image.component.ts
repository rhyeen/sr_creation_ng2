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
  private content;
  private add_image_btn = 'Link';
  private file = null;
  private thumbnail = null;

  constructor(
    private pageService: PageService,
    private fileService: FileService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.resetContent();
    this.file = null;
  }

  cancel() {
    this.show_state = false;
  }

  resetContent() {
    this.content = {
      mark_down: null,
      partitions: []
    };
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
    this.fileService.uploadImage(this.file)
      .subscribe(
        results => this.handleImageUploadResults(results),
        error => this.error = <any>error);
  }

  private handleImageUploadResults(results) {
    this.fileService.uploadThumbnail(this.thumbnail)
      .subscribe(
        results => this.handleThumbnailUploadResults(results),
        error => this.error = <any>error);
  }

  private handleThumbnailUploadResults(results) {
    debugger;
  }

  private linkImage() {
    let name = this.name;
    if (!name) {
      name = 'New image';
    }
    let content = this.content;
    if (!content) {
      this.resetContent();
      content = this.content;
    }
    let page_id = this.pageService.getPageId();
    this.setLoading();
    this.pageService.newImage(name, content, page_id)
      .subscribe(
        data => this.reloadPage(),
        error => this.error = <any>error);
    this.cancel();
  }

  private setLoading() {
    this.setImagesLoading.emit();
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
}