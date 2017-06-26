import {Injectable} from '@angular/core';
import {URLSearchParams, Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MapService {
  private base_url = 'http://localhost:4000';
  private map_url = this.base_url + '/user/map';
  private map_image_url = this.map_url + '/image';
  private map_link_url = this.map_url + '/link';
  private page_search_url = this.map_url + '/search';

  constructor (private http: Http) {}

  getMap(id) {
    let params = this.setGetMapParams(id);
    let options = this.setRequestOptions(params);
    return this.http
      .get(this.map_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  newImage(name, caption, source, image_link, thumbnail_link, page_id) {
    let body = {
      'name': name,
      'caption': caption,
      'source': source,
      'link': image_link,
      'thumbnail': {
        'link': thumbnail_link
      }
    };
    let params = this.setAddImagesParams(page_id);
    let options = this.setRequestOptions(params);
    return this.http
      .post(this.map_image_url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addMapLink(link, page_id) {
    link = this.extractLinkId(link);
    let params = this.setAddMapLinkParams(link, page_id);
    let options = this.setRequestOptions(params);
    return this.http
      .put(this.map_link_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchRelevantMapImages(query) {
    let params = this.setSearchRelevantPagesParams(query);
    let options = this.setRequestOptions(params);
    return this.http
      .get(this.page_search_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private setSearchRelevantPagesParams(query) {
    let params = new URLSearchParams();
    if (query) {
      params.set('query', query);
    }
    return params;
  }

  extractLinkId(link) {
    return link.id;
  }

  private setGetMapParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    return params;
  }

  private setAddImagesParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    return params;
  }

  private setAddMapLinkParams(link_id, page_id) {
    let params = new URLSearchParams();
    if (link_id) {
      params.set('map_id', link_id);
    }
    if (page_id) {
      params.set('page_id', page_id);
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