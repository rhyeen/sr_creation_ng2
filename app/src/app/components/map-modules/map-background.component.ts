import {Component, OnInit} from '@angular/core';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'sr-map-background',
  templateUrl: './map-background.html',
  styleUrls: ['./map-background.css'],
  inputs: ['map']
})
export class MapBackgroundComponent implements OnInit {
  private map;
  private image_link;

  constructor(
    private fileService: FileService
  ) {

  }

  ngOnInit() {
    if (this.map.image_id) {
      this.map.image_link = this.generateMapImageLink(this.map.image_id);
    }
  }

  private generateMapImageLink(link) {
    return this.fileService.getMapImageUrl(link);
  }
}