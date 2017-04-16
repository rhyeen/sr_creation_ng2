import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-relative-libraries',
  templateUrl: './relative-libraries.html',
  styleUrls: ['./relative-libraries.css'],
  inputs: ['relative_libraries']
})
export class RelativeLibrariesComponent implements OnInit {
  private relative_libraries;

  constructor(
    private pageService: PageService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  selectLibrary(library) {
    let library_name = library.name;
    let page_id = this.pageService.getPageId();
    this.router.navigate(['/library', page_id, library.name]);
  }

}