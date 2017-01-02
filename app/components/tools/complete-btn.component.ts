import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-complete-btn',
  templateUrl: './app/components/tools/complete-btn.html',
  styleUrls: ['./app/components/tools/complete-btn.css']
})
export class CompleteBtnComponent implements OnInit {
  @Output() complete = new EventEmitter();

  constructor(
  ) {

  }

  ngOnInit() {
    
  }

  completed() {
    this.complete.emit();
  }

}