import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sr-page-images-section',
  templateUrl: './page-images-section.html',
  styleUrls: ['./page-images-section.css'],
  inputs: ['page_images_section']
})
export class PageImagesSectionComponent implements OnInit {
  private page_images_section;
  private hide_images = false;
  private add_image_enabled = false;
  private is_loading = false;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  togglePageImages(show_content) {
    this.hide_images = !show_content;
  }

  toggleAddImage(enabled) {
    this.add_image_enabled = enabled;
  }

  setImages(page_images_section) {
    this.add_image_enabled = false;
    this.is_loading = false;
    this.page_images_section = page_images_section;
  }

  setImagesLoading() {
    this.is_loading = true;
  }
}