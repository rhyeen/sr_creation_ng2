import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

import { routing,
         appRoutingProviders }  from './app.routing';

import {RootContainerComponent} from './components/root-container.component';

import {BookmarksComponent} from './components/nav-modules/bookmarks.component';
import {BreadcrumbNavComponent} from './components/nav-modules/breadcrumb-nav.component';

import {PageTitleComponent} from './components/page-modules/page-title.component';
import {RelativeLibrariesComponent} from './components/page-modules/relative-libraries.component';
import {RelativePagesComponent} from './components/page-modules/relative-pages.component';
import {RelativePagesSectionsComponent} from './components/page-modules/relative-pages-sections.component';
import {RelativePageSummaryComponent} from './components/page-modules/relative-page-summary.component';
import {TrailNavComponent} from './components/page-modules/trail-nav.component';

import {NewItemBtnComponent} from './components/tools/new-item-btn.component';
import {SectionToggleBtnComponent} from './components/tools/section-toggle-btn.component';
import {BookmarksBtnComponent} from './components/tools/bookmarks-btn.component';
import {ContentHelpBtnComponent} from './components/tools/content-help-btn.component';

import {OverviewPageComponent} from './components/pages/overview-page.component';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
  	AppComponent,
  	RootContainerComponent,
    BookmarksComponent,
    BreadcrumbNavComponent,
    PageTitleComponent,
    RelativeLibrariesComponent,
    RelativePagesComponent,
    RelativePagesSectionsComponent,
    RelativePageSummaryComponent,
    TrailNavComponent,
    NewItemBtnComponent,
    SectionToggleBtnComponent,
    BookmarksBtnComponent,
    ContentHelpBtnComponent,
    OverviewPageComponent
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
