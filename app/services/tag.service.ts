import {Injectable} from '@angular/core';

@Injectable()
export class TagService {
  private base_url = '';
  private article_url = this.base_url + 'article/';
  private page_url = this.base_url + 'page/';

  generateTags(content, tags, endpoint) {
    if (!tags) {
      return content;
    }
    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i];
      let tag_start = tag['start'];
      let tag_end = tag['end'];
      let id = tag['id'];
      // need to do closing first to not offset the index
      content = this.addTagClosing(content, tag_end);
      content = this.addTagOpening(content, tag_start, id, endpoint);
    }
    return content;
  }

  private addTagOpening(content, index, id, endpoint) {
    return content.slice(0, index) + this.getTagOpening(id, endpoint) + content.slice(index);
  }

  private addTagClosing(content, index) {
    return content.slice(0, index) + this.getTagClosing() + content.slice(index);
  }

  private getTagOpening(id, endpoint) {
    if (endpoint === this.page_url) {
      endpoint += this.getPageType(id); + '/';
    }
    endpoint = endpoint + id;
    return '<a href="' + endpoint +'"">';
  }

  private getTagClosing() {
    return '</a>';
  }

  addTagsInContainer(tag_containers, tag_type) {
    let content_key, content_tag_key, results_key, endpoint;
    if (tag_type === 'article_detail') {
      content_key = 'content';
      content_tag_key = 'content_tags';
      results_key = 'tagged_content';
      endpoint = this.article_url;
    } else if (tag_type === 'relative_page_summary') {
      content_key = 'summary';
      content_tag_key = 'summary_tags';
      results_key = 'tagged_summary';
      endpoint = this.page_url;
    }
    for (let i = 0; i < tag_containers.length; i++) {
      tag_containers[i][results_key] = this.generateTags(tag_containers[i][content_key], tag_containers[i][content_tag_key], endpoint);
    }
  }

  /**
   * SOURCE: page.service.ts: keep updated.
   * @TODO: later, have one location instead of duplicating code.
   */
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
}