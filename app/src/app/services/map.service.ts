import {Injectable} from '@angular/core';
import {URLSearchParams, Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MapService {
  private base_url = 'http://localhost:4000';
  private map_url = this.base_url + '/user/map';
  private map_file_image_url = this.map_url + '/map-image';
  private map_id;

  constructor (private http: Http) {}

  getMap(id) {
    let params = this.setGetMapParams(id);
    this.setMapId(id);
    let options = this.setRequestOptions(params);
    return this.http
      .get(this.map_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  setMapId(id) {
    this.map_id = id;
  }

  getPageId() {
    return this.map_id;
  }

  createMap(name, parent_page_id) {
    let body = {
      'name': name
    };
    let params = this.setCreateMapParams(parent_page_id);
    let options = this.setRequestOptions(params);
    return this.http
      .put(this.map_url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  newImage(map_id, name, caption, source, image_link, thumbnail_link, page_id) {
    let body = {
      'name': name,
      'caption': caption,
      'source': source,
      'link': image_link,
      'thumbnail': {
        'link': thumbnail_link
      }
    };
    let params = this.setAddImagesParams(page_id, map_id);
    let options = this.setRequestOptions(params);
    return this.http
      .post(this.map_file_image_url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private setCreateMapParams(parent_page_id) {
    let params = new URLSearchParams();
    if (parent_page_id) {
      params.set('id', parent_page_id);
    }
    return params;
  }

  private setGetMapParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    return params;
  }

  private setAddImagesParams(id, map_id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    if (map_id) {
      params.set('map', map_id);
    }
    return params;
  }

  private setRequestOptions(params) {
    let headers = this.setHeaders();
    let options = new RequestOptions({
      headers: headers,
      search: params
    });
    return options;
  }

  private setHeaders() {
    // let headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'X-OWNER-ID': 'US_1234567890123'
    // });
    let headers = new Headers();
    return headers;
  }

  private extractData(res: Response) {
    let body;
    try {
      body = res.json();
    }
    catch (e) {
      body = res.text();
    }
    body = body.data || body;
    return body;
  }

  private handleError (error: Response | any) {
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
}