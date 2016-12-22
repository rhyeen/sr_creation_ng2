import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';
import {TagService} from '../../services/tag.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'sr-tag-render-btn',
  templateUrl: './app/components/tools/tag-render-btn.html',
  styleUrls: ['./app/components/tools/tag-render-btn.css'],
  inputs: ['state_key', 'state_event_key', 'content_container']
})
export class TagRenderBtnComponent implements OnInit {
  private state_key;
  private state_event_key;
  private content_container;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private tagService: TagService
  ) {

  }

  ngOnInit() {
    
  }

  renderTags() {
    this.tagService.renderPartitions(this.content_container)
      .subscribe((data) => {
        this.content_container['content'] = data;
      });
    this.stateService.editState(this.state_key, this.state_event_key, false);
  }

}