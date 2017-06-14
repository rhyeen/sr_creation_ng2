import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sr-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.css'],
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

  changeContent(event) {
    let old_string = this.content_container[this.content_key];
    let new_string = event.target.textContent;
    // let differences = this.getDifferenceBetweenStrings(old_string, new_string);
    this.content_container[this.content_key] = new_string;
  }

  getDifferenceBetweenStrings(old_string, new_string) {
    let change = '';
    let change_type = '';
    let start_index = -1;
    let end_index = -1;
    for (let i = 0; i < old_string.length; i++) {
      if (old_string[i] != new_string[i]) {
        if (start_index == -1) {
          start_index = i;
        }
        end_index = i;
        if (old_string.length > new_string.length) {
          change_type = 'removed';
          change += old_string[i];
          new_string = new_string.slice(0, i) + old_string[i] + new_string.slice(i);
        } else {
          change_type = 'added';
          change += new_string[i];
          old_string = old_string.slice(0, i) + old_string[i] + old_string.slice(i);
        }
        // @TODO: doesn't handle replace (paste over a selected line)
      }
    }
    //console.log(change_type + ': ' + change + 'from ' + start_index + ' to ' + end_index);
    return {
      change: change,
      change_type: change_type,
      start_index: start_index,
      end_index: end_index
    }
  }
}