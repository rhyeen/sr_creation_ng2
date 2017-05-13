import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-trail-nav',
  templateUrl: './trail-nav.html',
  styleUrls: ['./trail-nav.css']
})
export class TrailNavComponent implements OnInit {
  private page;
  private options_btn_config = {
    'color': 'white'
  };

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  goHome() {
    if (!this.pageService.isHomePage()) {
      this.router.navigate(['/']);
    }
  }
}