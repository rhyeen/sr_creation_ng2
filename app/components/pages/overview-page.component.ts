import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-overview-page',
  templateUrl: './app/components/pages/overview-page.html',
  styleUrls: ['./app/components/pages/overview-page.css'],
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