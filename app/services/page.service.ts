import {Injectable} from '@angular/core';

@Injectable()
export class PageService {
  private page = {
    title: "The curse of the chicken foot",
    summary: "Players are expected to take the left path at the Crow's crossing.  If they take the right, they will be taken through the woods of dread's love and to Lady Giga's haunted house.  There, they will most certainly meet their doom as Giga likes to eat adventurers",
    relative_libraries: [
      {
        name: "Campaigns"
      },
      {
        name: "Players"
      },
      {
        name: "Encounters"
      },
      {
        name: "Stores"
      },
      {
        name: "Locations"
      },
      {
        name: "Characters"
      }
    ],
    relative_pages_sections: [
      {
        title: "Current Quests",
        relative_pages: [
          {
            name: "Curse of the chicken foot"
          },
          {
            name: "Vox Machina",
            summary: "Players are expected to take the left path at the Crow's crossing.  If they take the right, they will be taken through the woods of dread's love and to Lady Giga's haunted house.  There, they will most certainly meet their doom as Giga likes to eat adventurers"
          },
          {
            name: "Big content",
            summary: "Players are expected to take the left path at the Crow's crossing.  If they take the right, they will be taken through the woods of dread's love and to Lady Giga's haunted house.  There, they will most certainly meet their doom as Giga likes to eat adventurers"
          }
        ]
      },
      {
        title: "NPCs",
        relative_pages: [
          {
            name: "Curse of the chicken foot"
          },
          {
            name: "Vox Machina",
            summary: "This is a test summary"
          },
          {
            name: "Big content",
            summary: "Players are expected to take the left path at the Crow's crossing.  If they take the right, they will be taken through the woods of dread's love and to Lady Giga's haunted house.  There, they will most certainly meet their doom as Giga likes to eat adventurers"
          }
        ]
      }
    ],
    breadcrumbs: [
    ]
  };

  getPageTitle() {
    return this.page.title;
  }

  getRelativeLibraries() {
    return this.page.relative_libraries;
  }

  getRelativePagesSections() {
    return this.page.relative_pages_sections;
  }

  getBreadCrumbs() {
    return this.page.breadcrumbs;
  }

  getRelativePageSummary(page_section_index, page_index) {
    if (page_section_index == null || page_index == null) {
      return null;
    }
    var page = this.page.relative_pages_sections[page_section_index]['relative_pages'][page_index];
    return this._extractSummary(page);
  }

  private _extractSummary(page) {
    if (!('summary' in page)) {
      return null;
    }
    return page['summary'];
  }

  getPageSummary() {
    return this._extractSummary(this.page);
  }
}