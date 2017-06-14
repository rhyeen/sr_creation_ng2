import {Injectable} from '@angular/core';

@Injectable()
export class BookmarksService {
  private bookmarks_config = {
    bookmarks: []
  };

  getBookmarks() {
    return this.bookmarks_config.bookmarks;
  }
}