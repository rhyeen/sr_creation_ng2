import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'sr-trail-nav',
  templateUrl: './app/views/page-modules/trail-nav.html',
  styleUrls: ['./app/styles/clean-tone/page-modules/trail-nav.css']
})
export class TrailNavComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/']);
  }
}