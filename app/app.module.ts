import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule,
         JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { routing,
         appRoutingProviders }  from './app.routing';

// root
import {RootContainerComponent} from './components/root-container.component';

// nav-modules
import {BookmarksComponent} from './components/nav-modules/bookmarks.component';
import {BreadcrumbNavComponent} from './components/nav-modules/breadcrumb-nav.component';

// page-modules
import {PageTitleComponent} from './components/page-modules/page-title.component';
import {PageSummaryComponent} from './components/page-modules/page-summary.component';
import {RelativeLibrariesComponent} from './components/page-modules/relative-libraries.component';
import {RelativePagesComponent} from './components/page-modules/relative-pages.component';
import {RelativePagesSectionsComponent} from './components/page-modules/relative-pages-sections.component';
import {RelativePageSummaryComponent} from './components/page-modules/relative-page-summary.component';
import {TrailNavComponent} from './components/page-modules/trail-nav.component';

// tools
import {NewItemBtnComponent} from './components/tools/new-item-btn.component';
import {SectionToggleBtnComponent} from './components/tools/section-toggle-btn.component';
import {BookmarksBtnComponent} from './components/tools/bookmarks-btn.component';
import {ContentHelpBtnComponent} from './components/tools/content-help-btn.component';
import {ExitBtnComponent} from './components/tools/exit-btn.component';
import {AddBookmarkBtnComponent} from './components/tools/add-bookmark-btn.component';
import {SpinnerComponent} from './components/tools/spinner.component';
import {OptionsBtnComponent} from './components/tools/options-btn.component';
import {EditBtnComponent} from './components/tools/edit-btn.component';
import {RemoveBtnComponent} from './components/tools/remove-btn.component';
import {MoveBtnComponent} from './components/tools/move-btn.component';
import {TextareaComponent} from './components/tools/textarea.component';

// pages
import {OverviewPageComponent} from './components/pages/overview-page.component';

// article
import {OverviewArticleComponent} from './components/article/overview-article.component';

// article-modules
import {ArticleDescriptionComponent} from './components/article-modules/article-description.component';
import {ArticleDetailsComponent} from './components/article-modules/article-details.component';
import {ArticleDetailContentComponent} from './components/article-modules/article-detail-content.component';
import {ArticleDetailContentEditComponent} from './components/article-modules/article-detail-content-edit.component';



@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  declarations: [
  	AppComponent,
  	RootContainerComponent,
    BookmarksComponent,
    BreadcrumbNavComponent,
    PageTitleComponent,
    PageSummaryComponent,
    RelativeLibrariesComponent,
    RelativePagesComponent,
    RelativePagesSectionsComponent,
    RelativePageSummaryComponent,
    TrailNavComponent,
    NewItemBtnComponent,
    SectionToggleBtnComponent,
    BookmarksBtnComponent,
    ContentHelpBtnComponent,
    ExitBtnComponent,
    RemoveBtnComponent,
    MoveBtnComponent,
    TextareaComponent,
    AddBookmarkBtnComponent,
    SpinnerComponent,
    OptionsBtnComponent,
    EditBtnComponent,
    OverviewPageComponent,
    OverviewArticleComponent,
    ArticleDescriptionComponent,
    ArticleDetailsComponent,
    ArticleDetailContentComponent,
    ArticleDetailContentEditComponent
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
