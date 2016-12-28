import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';
import {Router} from '@angular/router';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'sr-page-detail-content',
  templateUrl: './app/components/page-modules/page-detail-content.html',
  styleUrls: ['./app/components/page-modules/page-detail-content.css'],
  inputs: ['state_key', 'partitions', 'edit_state_key']
})
export class PageDetailContentComponent implements OnInit {
  private partitions;
  private state_key;
  private state;
  private edit_state_key;
  private edit_state;

  constructor(
    private stateService: StateService,
    private pageService: PageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.state = this.stateService.getState(this.state_key);
    this.edit_state = this.stateService.getState(this.edit_state_key);
  }

  showTag(partition) {
    let page_id = partition.tag.id;
    this.router.navigate(['/page', page_id]);
  }
}