import {Injectable} from '@angular/core';
import {URLSearchParams, Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TagService {
  private base_url = 'http://localhost:4000/';
  private tag_url = this.base_url + 'user/tag/';
  private render_tags_url = this.tag_url + 'render';

  constructor (private http: Http) {}

  renderPartitions(content_container) {
    let mark_down = content_container.content.mark_down;
    let id = content_container.id;
    let params = this.setRenderTagsParams(id);
    let options = this.setRequestOptions(params);
    let request_body = {
      'mark_down': mark_down
    };
    return this.http
      .post(this.render_tags_url, request_body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private setRenderTagsParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('detail_id', id);
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
    let body = res.json();
    return body.data || body;
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