import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FileService} from '../../../services/file.service';

@Component({
  selector: 'sr-map-background',
  templateUrl: './map-background.html',
  styleUrls: ['./map-background.css'],
  inputs: ['map']
})
export class MapBackgroundComponent implements OnInit {
  private map;
  @Output() refreshMap = new EventEmitter();
  @Output() loading = new EventEmitter();
  private image_link;

  constructor(
    private fileService: FileService
  ) {

  }

  ngOnInit() {
    if (this.map.image && this.map.image.link) {
      this.image_link = this.generateMapImageLink(this.map.image.link);
    }
  }

  private generateMapImageLink(link) {
    return this.fileService.getImageUrl(link);
  }

  imageLoading() {
    this.loading.emit();
  }

  setImage(image) {
    this.refreshMap.emit();
  }
}