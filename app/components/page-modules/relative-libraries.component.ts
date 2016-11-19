import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-relative-libraries',
  templateUrl: './app/components/page-modules/relative-libraries.html',
  styleUrls: ['./app/components/page-modules/relative-libraries.css']
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