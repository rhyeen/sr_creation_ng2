import {Injectable} from '@angular/core';
import {URLSearchParams, Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BreadcrumbService {
  private breadcrumbs_container = {
    breadcrumbs: []
  };

  constructor (private http: Http) {}

  getBreadCrumbsContainer() {
    return this.breadcrumbs_container;
  }
}