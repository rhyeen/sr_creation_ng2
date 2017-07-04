import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MapService} from '../../../services/map.service';
import {FileService} from '../../../services/file.service';
import {PageService} from '../../../services/page.service';

@Component({
  selector: 'sr-add-map-image',
  templateUrl: './add-map-image.html',
  styleUrls: ['./add-map-image.css'],
  inputs: ['map', 'show_state']
})
export class AddMapImageComponent implements OnInit {
  private map;
  @Output() setImage = new EventEmitter();
  @Output() setImageLoading = new EventEmitter();
  private show_state;
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
    private mapService: MapService,
    private fileService: FileService,
    private pageService: PageService
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
    let page_id = this.map.page_id;
    this.thumbnail_link = results.file_name;
    this.mapService.newImage(this.map.id, this.name, this.caption, this.source, this.image_link, this.thumbnail_link, page_id)
      .subscribe(
        results => this.passSetImage(this.image_link),
        error => this.error = <any>error);
  }

  private linkImage() {
    let link = this.search_selected_item;
    this.setLoading();
    this.pageService.addDefinedPageLink(this.map.id, link, [])
      .subscribe(
        data => this.passSetImage(this.pageService.extractLinkId(link)),
        error => this.error = <any>error);
    this.cancel();
  }

  private setLoading() {
    this.setImageLoading.emit();
  }

  private passSetImage(image_id) {
    this.map.image_id = image_id;
    this.setImage.emit(image_id);
  }
}