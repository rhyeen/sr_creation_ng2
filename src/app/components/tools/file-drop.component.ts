import {Component, OnInit, HostListener, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sr-file-drop',
  templateUrl: './file-drop.html',
  styleUrls: ['./file-drop.css']
})
export class FileDropComponent implements OnInit {
  @Output() fileDropped = new EventEmitter();

  constructor(
  ) {}

  ngOnInit() {
  }

  onFileInput(event) {
    let files = event.srcElement.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  /**
   * Drag over is necessary for overwriting drop. Otherwise,
   * browser will simply open the file in the browser window.
   */
  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    console.log('Test drop');
    event.preventDefault();
    event.stopPropagation();
    let files = event.dataTransfer.files;
    
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}