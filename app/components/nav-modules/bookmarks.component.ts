import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-bookmarks',
  templateUrl: './app/views/nav-modules/bookmarks.html',
  styleUrls: ['./app/styles/clean-tone/nav-modules/bookmarks.css'],
  providers: [PageService]
})
export class BookmarksComponent implements OnInit {

  constructor(
    private _pageService: PageService
  ) {

  }

  ngOnInit() {
  }

}