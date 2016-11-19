import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-overview-page',
  templateUrl: './app/views/pages/overview-page.html',
  styleUrls: ['./app/styles/clean-tone/pages/overview-page.css'],
  providers: [PageService]
})
export class OverviewPageComponent implements OnInit {

  constructor(
    private _pageService: PageService
  ) {

  }

  ngOnInit() {
  }

}