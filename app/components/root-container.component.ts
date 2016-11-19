import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {PageService} from '../services/page.service';
import {StateService} from '../services/state.service';

@Component({
  selector: 'sr-root-container',
  templateUrl: './app/views/root-container.html',
  styleUrls: ['./app/styles/clean-tone/root-container.css'],
  providers: [PageService, StateService]
})
export class RootContainerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private pageService: PageService
  ) {

  }

  ngOnInit() {
  }

  goToRoot() {
    this.router.navigate(['/']);
  }
}