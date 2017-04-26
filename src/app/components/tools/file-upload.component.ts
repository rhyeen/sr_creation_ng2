import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'sr-file-upload',
  templateUrl: './file-upload.html',
  styleUrls: ['./file-upload.css'],
  inputs: ['valid_file_types']
})
export class FileUploadComponent implements OnInit {
  @Output() fileReady = new EventEmitter();
  private file;
  private file_name;
  private error;
  private image_src;
  private valid_file_types;
  private known_file_extensions = {
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image'
  };
  private invalid_file_error = 'Not an accepted file extension';

  constructor(
    private fileService: FileService,
  ) {}

  ngOnInit() {
    this.resetFile();
  }

  private resetFile() {
    this.file = null;
    this.file_name = null;
  }


  onDroppedFiles(files) {
    let file = files[0];
    this.file_name = this.fileService.getFileName(file);
    if (this.isValidFile(file)) {
      if (this.isImageFile(file)) {
        this.conformImage(file);
      } else {
        this.file = file;
        this.emitFileReady();
      } 
    } else {
      this.resetFile();
      console.log(this.invalid_file_error);
      this.error = this.invalid_file_error;
      this.emitFileReady();
    }
  }

  private isValidFile(file) {
    if (this.valid_file_types == null || this.valid_file_types.length <= 0) {
       return true;
    }
    let extension = this.fileService.getFileExtension(file);
    return extension in this.known_file_extensions && this.valid_file_types.indexOf(this.known_file_extensions[extension]) != -1;
  }

  private isImageFile(file) {
    let extension = this.fileService.getFileExtension(file);
    if (!(extension in this.known_file_extensions)) {
      return false;
    }
    return this.known_file_extensions[extension] == 'image';
  }

  private conformImage(file) {
    let self = this;
    this.fileService.conformImage(file).then(function(image_data) {
      self.file = image_data;
      self.image_src = self.file;
      self.emitFileReady();
    }, function(error) {
      self.resetFile();
      console.log(error);
      self.error = error;
      self.emitFileReady();
    });
  }

  private emitFileReady() {
    this.fileReady.emit({
      'file': this.file,
      'file_name': this.file_name
    });
  }
}


