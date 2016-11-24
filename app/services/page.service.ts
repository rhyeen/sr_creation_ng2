import {Injectable} from '@angular/core';
import { URLSearchParams, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PageService {
  private base_url = 'http://localhost:4000/';
  private page_url = this.base_url + 'user/page/';
  private page_overview_url = this.page_url + 'overview';
  private page_id = null;
  private page_breadcrumbs_container = {
    breadcrumbs: []
  };

  // private page = {
  //   title: "The curse of the chicken foot",
  //   summary: "Players are expected to take the left path at the Crow's crossing.  If they take the right, they will be taken through the woods of dread's love and to Lady Giga's haunted house.  There, they will most certainly meet their doom as Giga likes to eat adventurers",
  //   relative_libraries: [
  //     {
  //       name: "Campaigns"
  //     },
  //     {
  //       name: "Players"
  //     },
  //     {
  //       name: "Encounters"
  //     },
  //     {
  //       name: "Stores"
  //     },
  //     {
  //       name: "Locations"
  //     },
  //     {
  //       name: "Characters"
  //     }
  //   ],
  //   relative_pages_sections: [
  //     {
  //       title: "Current Quests",
  //       relative_pages: [
  //         {
  //           name: "Curse of the chicken foot"
  //         },
  //         {
  //           name: "Vox Machina",
  //           summary: "Players are expected to take the left path at the Crow's crossing.  If they take the right, they will be taken through the woods of dread's love and to Lady Giga's haunted house.  There, they will most certainly meet their doom as Giga likes to eat adventurers"
  //         },
  //         {
  //           name: "Big content",
  //           summary: "Players are expected to take the left path at the Crow's crossing.  If they take the right, they will be taken through the woods of dread's love and to Lady Giga's haunted house.  There, they will most certainly meet their doom as Giga likes to eat adventurers"
  //         }
  //       ]
  //     },
  //     {
  //       title: "NPCs",
  //       relative_pages: [
  //         {
  //           name: "Curse of the chicken foot"
  //         },
  //         {
  //           name: "Vox Machina",
  //           summary: "This is a test summary"
  //         },
  //         {
  //           name: "Big content",
  //           summary: "Players are expected to take the left path at the Crow's crossing.  If they take the right, they will be taken through the woods of dread's love and to Lady Giga's haunted house.  There, they will most certainly meet their doom as Giga likes to eat adventurers"
  //         }
  //       ]
  //     }
  //   ]
  // };

  constructor (private http: Http) {}

  getBreadCrumbsContainer() {
    return this.page_breadcrumbs_container;
  }

  getPage(page_type, id, library) {
    let params = this.setGetPageParams(page_type, id, library);
    let options = this.setRequestOptions(params);
    this.setPageId(id);
    return this.http
      .get(this.page_overview_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private setGetPageParams(page_type, id, library) {
    let params = new URLSearchParams();
    if (page_type) {
      params.set('pageType', page_type);
    }
    if (id) {
      params.set('id', id);
    }
    if (library) {
      params.set('library', library);
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
      return 'undefined';
    }
    return this.page_id;
  }

  getPageType(id) {
    let page_code = this.getPageCode(id);
    switch (page_code) {
      case 'CA':
        return 'campaign';
      case 'CH':
        return 'character';
      case 'CR':
        return 'creature';
      case 'EN':
        return 'encounter';
      case 'IT':
        return 'item';
      case 'LO':
        return 'location';
      case 'PL':
        return 'player';
      case 'QU':
        return 'quest';
      case 'SH':
        return 'shop';
      case 'ST':
        return 'story-arc';
      default:
        return null;
    }
  }

  private getPageCode(id) {
    let page_code = id.substring(0,2);
    return page_code.toUpperCase();
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