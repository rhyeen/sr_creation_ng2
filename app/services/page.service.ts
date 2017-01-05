import {Injectable} from '@angular/core';
import { URLSearchParams, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PageService {
  private base_url = 'http://localhost:4000';
  private page_url = this.base_url + '/user/page';
  private page_summary_url = this.page_url + '/summary';
  private page_detail_url = this.page_url + '/detail';
  private page_details_url = this.page_url + '/details';
  private page_image_url = this.page_url + '/image';
  private page_links_url = this.page_url + '/page-links';
  private page_search_url = this.page_url + '/search';

  private page_id;

  constructor (private http: Http) {}

  isHomePage() {
    let page_code = this.getPageCode(null);
    return page_code == 'RR';
  }

  newDetail(name, content, id) {
    let body = {
      'name': name,
      'content': content
    };
    let params = this.setAddDetailsParams(id);
    let options = this.setRequestOptions(params);
    return this.http
      .post(this.page_detail_url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addPageStates(page) {
    page._states = {};
    this.addDetailStates(page);
    if (page.pages && page.pages.length) {
      for (let page_section of page.pages) {
        this.addPageSectionStates(page_section);
      }
    }
  }

  private addDetailStates(page) {
    if (page.details && page.details.list && page.details.list.length) {
      for (let detail of page.details.list) {
        detail._states = {};
      }
    }
  }

  private addPageSectionStates(page_section) {
    page_section._states = {};
    if (page_section.properties) {
      let lists = page_section.properties.list;
      if (lists && lists.length) {
        for (let page_link of lists) {
          page_link._states = {};
        }
      }
    }
  }

  searchRelevantPages(query, type) {
    let params = this.setSearchRelevantPagesParams(query, type);
    let options = this.setRequestOptions(params);
    return this.http
      .get(this.page_search_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  reorderDetails(details) {
    details = this.extractDetailIds(details);
    let page_id = this.getPageId();
    let body = {
      'details': details
    };
    let params = this.setReorderDetailsParams(page_id);
    let options = this.setRequestOptions(params);
    return this.http
      .put(this.page_details_url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractDetailIds(details) {
    let detail_ids = [];
    if (!details || !details.length) {
      return [];
    }
    for (let detail of details) {
      detail_ids.push(this.extractDetailId(detail));
    }
    return detail_ids;
  }

  private extractDetailId(detail) {
    return detail.id;
  }

  deleteDetail(detail) {
    let detail_id = this.extractDetailId(detail);
    let page_id = this.getPageId();
    let params = this.setDeleteDetailsParams(page_id, detail_id);
    let options = this.setRequestOptions(params);
    return this.http
      .delete(this.page_detail_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateDetail(detail) {
    let detail_id = this.extractDetailId(detail);
    let page_id = this.getPageId();
    let body = {
      'name': detail.name,
      'content': detail.content
    };
    let params = this.setUpdateDetailsParams(page_id, detail_id);
    let options = this.setRequestOptions(params);
    return this.http
      .put(this.page_detail_url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  reorderPageLinks(links) {
    links = this.extractLinkIds(links);
    let page_id = this.getPageId();
    return this.updatePageLinks(links, page_id);
  }

  deletePageLink(link, links) {
    links = this.extractLinkIds(links);
    link = this.extractLinkId(link);
    let page_id = this.getPageId();
    let link_index: number = links.indexOf(link);
    if (link_index > -1) {
      links.splice(link_index, 1);
    }
    return this.updatePageLinks(links, page_id);
  }

  addPageLink(link, links) {
    links = this.extractLinkIds(links);
    link = this.extractLinkId(link);
    let page_id = this.getPageId();
    links.push(link);
    return this.updatePageLinks(links, page_id);
  }

  private extractLinkIds(links) {
    let link_ids = [];
    if (!links || !links.length) {
      return [];
    }
    for (let link of links) {
      link_ids.push(this.extractLinkId(link));
    }
    return link_ids;
  }

  private extractLinkId(link) {
    return link.id;
  }

  updatePageLinks(links, id) {
    let body = {
      'links': links
    };
    let params = this.setUpdatePageLinksParams(id);
    let options = this.setRequestOptions(params);
    return this.http
      .put(this.page_links_url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPage(id) {
    let params = this.setGetPageParams(id);
    let options = this.setRequestOptions(params);
    return this.http
      .get(this.page_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  newPage(name, type, parent_page_id) {
    let params = this.setPutPageParams(name, type, parent_page_id);
    let options = this.setRequestOptions(params);
    return this.http
      .put(this.page_url, null, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deletePage(id) {
    let params = this.setDeletePageParams(id);
    let options = this.setRequestOptions(params);
    return this.http
      .delete(this.page_url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatePageSummary(id, page_name, page_summary) {
    let body = {
      'name': page_name,
      'summary': page_summary
    };
    let params = this.setUpdatePageSummaryParams(id);
    let options = this.setRequestOptions(params);
    return this.http
      .put(this.page_summary_url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private setUpdatePageSummaryParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    return params;
  }

  private setUpdateDetailsParams(id, detail) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    if (detail) {
      params.set('detail', detail);
    }
    return params;
  }

  private setDeleteDetailsParams(id, detail) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    if (detail) {
      params.set('detail', detail);
    }
    return params;
  }

  private setReorderDetailsParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    return params;
  }

  private setAddDetailsParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    return params;
  }

  private setSearchRelevantPagesParams(query, type) {
    let params = new URLSearchParams();
    if (query) {
      params.set('query', query);
    }
    if (type) {
      params.set('type', type);
    }
    return params;
  }

  private setUpdatePageLinksParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    return params;
  }

  private setGetPageParams(id) {
    let params = new URLSearchParams();
    if (id) {
      params.set('id', id);
    }
    return params;
  }

  private setPutPageParams(name, type, parent_page_id) {
    let params = new URLSearchParams();
    if (name) {
      params.set('name', name);
    }
    if (type) {
      params.set('type', type);
    }
    if (parent_page_id) {
      params.set('link', parent_page_id);
    }
    return params;
  }

  private setDeletePageParams(id) {
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
    if (!id) {
      id = this.getPageId();
    }
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
          case 'SA':
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
    let body;
    try {
      body = res.json();
    }
    catch (e) {
      body = res.text();
    }
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