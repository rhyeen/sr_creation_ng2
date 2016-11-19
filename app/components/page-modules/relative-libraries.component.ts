import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-relative-libraries',
  templateUrl: './app/views/page-modules/relative-libraries.html',
  styleUrls: ['./app/styles/clean-tone/page-modules/relative-libraries.css']
})
export class RelativeLibrariesComponent implements OnInit {
  private relative_libraries;

  constructor(
    private pageService: PageService
  ) {

  }

  ngOnInit() {
    this.relative_libraries = this.pageService.getRelativeLibraries();
  }

  selectLibrary(library) {
    
  }

}