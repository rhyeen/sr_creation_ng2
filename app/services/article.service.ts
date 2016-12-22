import {Injectable} from '@angular/core';
import { URLSearchParams, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleService {
  private base_url = 'http://localhost:4000/';
  private article_url = this.base_url + 'user/article/';
  private article_overview_url = this.article_url + 'overview';
  private article_id = null;

  constructor (private http: Http) {}

  getArticle(id) {
    let params = this.setGetArticleParams(id);
    let options = this.setRequestOptions(params);
    this.setArticleId(id);
    return this.http
      .get(this.article_overview_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

   setArticleId(id) {
    this.article_id = id;
  }

  getArticleId() {
    if (!this.article_id) {
      return 'undefined';
    }
    return this.article_id;
  }

  addTags(article, tag_service) {
    // let tag_containers = article['description']['details'];
    // tag_service.addTagsInContainer(tag_containers, 'article_detail');
    // let relative_pages_sections = article['relative_pages_sections'];
    // for (let i = 0; i < relative_pages_sections.length; i++) {
    //   tag_containers = relative_pages_sections[i]['relative_pages'];
    //   tag_service.addTagsInContainer(tag_containers, 'relative_pages_summary');
    // }
  }

  private setGetArticleParams(id) {
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