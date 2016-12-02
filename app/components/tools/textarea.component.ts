import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-textarea',
  templateUrl: './app/components/tools/textarea.html',
  styleUrls: ['./app/components/tools/textarea.css'],
  inputs: ['content_container', 'content_key']
})
export class TextareaComponent implements OnInit {
  private content_container;
  private content_key;

  constructor(
  ) {

  }

  ngOnInit() {
    
  }
}