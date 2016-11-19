import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {PageService} from '../services/page.service';
import {StateService} from '../services/state.service';
import {BookmarksService} from '../services/bookmarks.service';

@Component({
  selector: 'sr-root-container',
  templateUrl: './app/components/root-container.html',
  styleUrls: ['./app/components/root-container.css'],
  providers: [PageService, StateService, BookmarksService]
})
export class RootContainerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private pageService: PageService,
    private bookmarksService: BookmarksService
  ) {

  }

  ngOnInit() {
  }

  goToRoot() {
    this.router.navigate(['/']);
  }
}