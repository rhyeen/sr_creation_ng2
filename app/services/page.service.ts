import {Injectable} from '@angular/core';
import { URLSearchParams, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PageService {
  private base_url = 'http://localhost:4000';
  private page_url = this.base_url + '/user/page';
  private page_summary_url = this.page_url + '/summary';
  private page_detail_url = this.page_url + '/detail';
  private page_image_url = this.page_url + '/image';
  private page_links_url = this.page_url + '/page-links';
  private page_id;

  constructor (private http: Http) {}

  getPage(id) {
    let params = this.setGetPageParams(id);
    let options = this.setRequestOptions(params);
    this.setPageId(id);
    return this.http
      .get(this.page_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private setGetPageParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
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

  setPageId(id) {
    this.page_id = id;
  }

  getPageId() {
    if (!this.page_id) {
      return null;
    }
    return this.page_id;
  }

  private getPageCode(id) {
    let page_code = id.substring(0,2);
    return page_code.toUpperCase();
  }

  private extractData(res: Response) {
    let addTitles = function(response_body) {
      let getPageTitle = function(page) {
        if (!page.type) {
          return null;
        }
        let type = page.type;
        switch (type) {
          case 'CA':
            return 'campaigns';
          case 'CH':
            return 'characters';
          case 'CR':
            return 'creatures';
          case 'EN':
            return 'encounters';
          case 'IT':
            return 'items';
          case 'LO':
            return 'locations';
          case 'PL':
            return 'players';
          case 'QU':
            return 'quests';
          case 'SH':
            return 'shops';
          case 'ST':
            return 'story arcs';
          default:
            return null;
        }
      }
      if (!response_body) {
        return;
      }
      if (response_body.pages && response_body.pages.length) {
        for (let page of response_body.pages) {
          page.title = getPageTitle(page);
        }
      }
    }
    let body = res.json();
    body = body.data || body;
    addTitles(body);
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