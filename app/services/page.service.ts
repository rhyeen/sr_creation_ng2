import {Injectable} from '@angular/core';

@Injectable()
export class PageService {
  private page = {
    title: "Main Page",
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
        title: "Current Campaigns",
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
        title: "Archived Campaigns",
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

  getPageSummary(page_section_index, page_index) {
    if (page_section_index == null || page_index == null) {
      return null;
    }
    var page = this.page.relative_pages_sections[page_section_index]['relative_pages'][page_index];
    if (!('summary' in page)) {
      return null;
    }
    return page['summary'];
  }
}