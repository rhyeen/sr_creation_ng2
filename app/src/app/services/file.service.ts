import {Injectable} from '@angular/core';
import {URLSearchParams, Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileService {
  private base_url = 'http://localhost:4000';
  private file_url = this.base_url + '/user/file';
  private image_url = this.file_url + '/image';
  private thumbnail_url = this.image_url + '/thumbnail';
  private map_image_url = this.image_url + '/map-image';
  private image_quality = 1; // scale from 0.0 to 1.0
  private thumbnail_quality = 1; // scale from 0.0 to 1.0
  private image_max_width = 700;
  private image_max_height = 700;
  // @TODO: should be 4000, disabling for now until bug is resolved: https://github.com/rhyeen/sr_creation/issues/29
  private map_image_max_width = 1000;
  private map_image_max_height = 1000;
  private thumbnail_max_width = 370;
  private thumbnail_max_height = 370;

  constructor (private http: Http) {}

  getImageUrl(image_link) {
    return this.image_url + '/' + image_link;
  }

  getThumbnailUrl(thumbnail_link) {
    return this.thumbnail_url + '/' + thumbnail_link;
  }

  getMapImageUrl(map_image_link) {
    return this.map_image_url + '/' + map_image_link;
  }

  getFileName(file) {
    return file.name;
  }

  getFileExtension(file) {
    let file_name = file.name;
    if (file_name === null) {
      return '';
    }
    // no extension
    if (file_name.lastIndexOf('.') == -1) {
      return '';
    }
    // files like .htaccess
    if (file_name.lastIndexOf('.') == 0) {
      return '';
    }
    return file_name.substr(file_name.lastIndexOf('.') + 1);
  }

  uploadImage(file) {
    let form_data = new FormData();
    form_data.append('file', file);
    let body = {
      data: file
    };
    return this.http
      .post(this.image_url, form_data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  uploadThumbnail(file) {
    let form_data = new FormData();
    form_data.append('file', file);
    let body = {
      data: file
    };
    return this.http
      .post(this.thumbnail_url, form_data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || body;
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let error_message: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      error_message = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      error_message = error.message ? error.message : error.toString();
    }
    console.error(error_message);
    return Observable.throw(error_message);
  }

  conformImage(file, conform_type) {
    let max_width = this.image_max_width;
    let max_height = this.image_max_height;
    if (conform_type === 'map-image') {
      max_width = this.map_image_max_width;
      max_height = this.map_image_max_height;
    }
    return this.conformImageWithDimensions(file, max_width, max_height);
  }

  private conformImageWithDimensions(file, width, height) {
    let self = this;
    return new Promise((resolve, reject) => {
      try {
        let image_file = self.convertToImage(file);
        image_file.onload = function () {
          try {
            let image_file = this;
            let max_width = self.findMaxScaledWidth(image_file, width, height);
            let image_data = self.scaleImage(image_file, max_width, self.image_quality, file);
            max_width = self.findMaxScaledWidth(image_file, self.thumbnail_max_width, self.thumbnail_max_height);
            let thumbnail_data = self.scaleImage(image_file, max_width, self.thumbnail_quality, file);
            resolve({
              image_data: image_data,
              thumbnail_data: thumbnail_data
            });
          } catch(error) {
            reject(error);
          }
        }
      }
      catch(error) {
        reject(error);
      }
    });
  }

  private convertToImage(file) {
    let image = new Image();
    image.src = URL.createObjectURL(file);
    return image;
  }

  private findMaxScaledWidth(image_file, max_width, max_height) {
    let width = image_file.width;
    let height = image_file.height;
    if (width > max_width) {
      height = height * (max_width / (1.0 * width));
      height = Math.round(height);
      width = max_width;
    }
    if (height > max_height) {
      width = width * (max_height / (1.0 * height));
      width = Math.round(width);
      // unnecessary, but kept for clarity
      height = max_height;
    }
    return width;
  }      

  /**
   * SOURCE: http://stackoverflow.com/questions/10333971/html5-pre-resize-images-before-uploading
   * AUTHOR: Ross Taylor-Turner and Voles.
   */
  private scaleImage(image_file, max_width, quality, file) {
    let canvas = document.createElement('canvas');
    canvas.width = image_file.width;
    canvas.height = image_file.height;
    canvas.getContext('2d').drawImage(image_file, 0, 0, canvas.width, canvas.height);
    while (canvas.width >= (2 * max_width)) {
        canvas = this.getHalfScaleCanvas(canvas);
    }
    if (canvas.width > max_width) {
        canvas = this.scaleCanvasWithAlgorithm(canvas, max_width);
    }
    let data_url_type = this.getDataURLType(file);
    let image_data = canvas.toDataURL(data_url_type, quality);
    return image_data;
  }

  private getDataURLType(file) {
    let extension = this.getFileExtension(file);
    if (extension == 'jpg' || extension == 'jpeg') {
      return 'image/jpeg';
    }
    if (extension == 'png') {
      return 'image/png';
    }
    return 'image/png';
  }

  /**
   * SOURCE: http://stackoverflow.com/questions/10333971/html5-pre-resize-images-before-uploading
   * AUTHOR: Ross Taylor-Turner and Voles.
   */
  private getHalfScaleCanvas(canvas) {
    var half_canvas = document.createElement('canvas');
    half_canvas.width = canvas.width / 2;
    half_canvas.height = canvas.height / 2;
    half_canvas.getContext('2d').drawImage(canvas, 0, 0, half_canvas.width, half_canvas.height);
    return half_canvas;
  }

  /**
   * SOURCE: http://stackoverflow.com/questions/10333971/html5-pre-resize-images-before-uploading
   * AUTHOR: Ross Taylor-Turner and Voles.
   */
  private scaleCanvasWithAlgorithm(canvas, max_width) {
    let scaled_canvas = document.createElement('canvas');
    let scale = max_width / canvas.width;
    scaled_canvas.width = canvas.width * scale;
    scaled_canvas.height = canvas.height * scale;
    let source_image_data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    let destination_image_data = scaled_canvas.getContext('2d').createImageData(scaled_canvas.width, scaled_canvas.height);
    this.applyBilinearInterpolation(source_image_data, destination_image_data, scale);
    scaled_canvas.getContext('2d').putImageData(destination_image_data, 0, 0);
    return scaled_canvas;
  }

  /**
   * SOURCE: http://stackoverflow.com/questions/10333971/html5-pre-resize-images-before-uploading
   * AUTHOR: Ross Taylor-Turner and Voles.
   */
  private applyBilinearInterpolation(source, destination, scale) {
    function inner(f00, f10, f01, f11, x, y) {
      let un_x = 1.0 - x;
      let un_y = 1.0 - y;
      return (f00 * un_x * un_y + f10 * x * un_y + f01 * un_x * y + f11 * x * y);
    }
    let i, j;
    let iyv, iy0, iy1, ixv, ix0, ix1;
    let idxD, idxS00, idxS10, idxS01, idxS11;
    let dx, dy;
    let r, g, b, a;
    for (i = 0; i < destination.height; ++i) {
      iyv = i / scale;
      iy0 = Math.floor(iyv);
      // Math.ceil can go over bounds
      iy1 = (Math.ceil(iyv) > (source.height - 1) ? (source.height - 1) : Math.ceil(iyv));
      for (j = 0; j < destination.width; ++j) {
        ixv = j / scale;
        ix0 = Math.floor(ixv);
        // Math.ceil can go over bounds
        ix1 = (Math.ceil(ixv) > (source.width - 1) ? (source.width - 1) : Math.ceil(ixv));
        idxD = (j + destination.width * i) * 4;
        // matrix to vector indices
        idxS00 = (ix0 + source.width * iy0) * 4;
        idxS10 = (ix1 + source.width * iy0) * 4;
        idxS01 = (ix0 + source.width * iy1) * 4;
        idxS11 = (ix1 + source.width * iy1) * 4;
        // overall coordinates to unit square
        dx = ixv - ix0;
        dy = iyv - iy0;
        // I let the r, g, b, a on purpose for debugging
        r = inner(source.data[idxS00], source.data[idxS10], source.data[idxS01], source.data[idxS11], dx, dy);
        destination.data[idxD] = r;

        g = inner(source.data[idxS00 + 1], source.data[idxS10 + 1], source.data[idxS01 + 1], source.data[idxS11 + 1], dx, dy);
        destination.data[idxD + 1] = g;

        b = inner(source.data[idxS00 + 2], source.data[idxS10 + 2], source.data[idxS01 + 2], source.data[idxS11 + 2], dx, dy);
        destination.data[idxD + 2] = b;

        a = inner(source.data[idxS00 + 3], source.data[idxS10 + 3], source.data[idxS01 + 3], source.data[idxS11 + 3], dx, dy);
        destination.data[idxD + 3] = a;
      }
    }
  };
};