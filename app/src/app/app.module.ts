import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule,
         JsonpModule } from '@angular/http';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';

import { AppComponent }  from './app.component';

import { routing,
         appRoutingProviders }  from './app.routing';

// root
import {RootContainerComponent} from './components/root-container.component';

// nav-modules
import {BookmarksComponent} from './components/nav-modules/bookmarks.component';
import {BreadcrumbNavComponent} from './components/nav-modules/breadcrumb-nav.component';

// page-modules
import {PageSummaryComponent} from './components/page-modules/page-summary.component';
import {RelativePagesComponent} from './components/link-modules/relative-pages.component';
import {RelativePagesSectionsComponent} from './components/link-modules/relative-pages-sections.component';
import {RelativePageSummaryComponent} from './components/link-modules/relative-page-summary.component';
import {TrailNavComponent} from './components/nav-modules/trail-nav.component';
import {PageDetailsSectionComponent} from './components/detail-modules/page-details-section.component';
import {PageDetailsComponent} from './components/detail-modules/page-details.component';
import {PageDetailContentComponent} from './components/detail-modules/page-detail-content.component';
import {PageImagesSectionComponent} from './components/image-modules/page-images-section.component';
import {PageImagesComponent} from './components/image-modules/page-images.component';
import {PageImageContentComponent} from './components/image-modules/page-image-content.component';
import {CancelImageBtnComponent} from './components/image-modules/cancel-image-btn.component';
import {MagnifyImageBtnComponent} from './components/image-modules/magnify-image-btn.component';

import {AddLinkComponent} from './components/link-modules/add-link.component';
import {AddDetailComponent} from './components/detail-modules/add-detail.component';
import {AddImageComponent} from './components/image-modules/add-image.component';
import {PagePropertiesComponent} from './components/page-modules/page-properties.component';

// map-modules
import {AddMapComponent} from './components/map-modules/add-map.component';
import {PageMapSummaryComponent} from './components/map-modules/page-map-summary.component';
import {PageMapsSectionComponent} from './components/map-modules/page-maps-section.component';
import {PageMapsComponent} from './components/map-modules/page-maps.component';

import {MapBackgroundComponent} from './components/map-view/map-modules/map-background.component';
import {AddMapImageComponent} from './components/map-view/map-modules/add-map-image.component';
import {MapForegroundComponent} from './components/map-view/map-modules/map-foreground.component';
import {MapOptionsComponent} from './components/map-view/map-modules/map-options.component';
import {AddPinBtnComponent} from './components/tools/btns/add-pin-btn.component';
import {EditBasicPinProperties} from './components/map-view/pin-modules/edit-basic-pin-properties.component';
import {EditBasicPinLocation} from './components/map-view/pin-modules/edit-basic-pin-location.component';
import {EditablePin} from './components/map-view/pin-modules/editable-pin.component';

// tools
import {NewItemBtnComponent} from './components/tools/btns/new-item-btn.component';
import {SectionToggleBtnComponent} from './components/tools/btns/section-toggle-btn.component';
import {BookmarksBtnComponent} from './components/tools/btns/bookmarks-btn.component';
import {ContentHelpBtnComponent} from './components/tools/btns/content-help-btn.component';
import {ExitBtnComponent} from './components/tools/btns/exit-btn.component';
import {AddBookmarkBtnComponent} from './components/tools/btns/add-bookmark-btn.component';
import {SpinnerComponent} from './components/tools/spinner.component';
import {OptionsBtnComponent} from './components/tools/btns/options-btn.component';
import {EditBtnComponent} from './components/tools/btns/edit-btn.component';
import {RemoveBtnComponent} from './components/tools/btns/remove-btn.component';
import {MoveBtnComponent} from './components/tools/btns/move-btn.component';
import {TextareaComponent} from './components/tools/textarea.component';
import {CompleteBtnComponent} from './components/tools/btns/complete-btn.component';
import {WorldMapBtnComponent} from './components/tools/btns/world-map-btn.component';
import {SearchResultsComponent} from './components/tools/search-results.component';
import {FileDropComponent} from './components/tools/file-drop.component';
import {FileInputComponent} from './components/tools/file-input.component';

// pages
import {OverviewPageComponent} from './components/pages/overview-page.component';
import {OverviewMapComponent} from './components/maps/overview-map.component';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    DragulaModule,
    routing
  ],
  declarations: [
  	AppComponent,
  	RootContainerComponent,
    BookmarksComponent,
    BreadcrumbNavComponent,
    PageSummaryComponent,
    RelativePagesComponent,
    RelativePagesSectionsComponent,
    RelativePageSummaryComponent,
    PagePropertiesComponent,
    TrailNavComponent,
    NewItemBtnComponent,
    SectionToggleBtnComponent,
    BookmarksBtnComponent,
    ContentHelpBtnComponent,
    ExitBtnComponent,
    RemoveBtnComponent,
    MoveBtnComponent,
    TextareaComponent,
    CompleteBtnComponent,
    WorldMapBtnComponent,
    AddBookmarkBtnComponent,
    SpinnerComponent,
    OptionsBtnComponent,
    EditBtnComponent,
    OverviewPageComponent,
    OverviewMapComponent,
    PageDetailsSectionComponent,
    PageDetailsComponent,
    PageDetailContentComponent,
    PageImagesSectionComponent,
    PageImagesComponent,
    PageImageContentComponent,
    CancelImageBtnComponent,
    MagnifyImageBtnComponent,
    AddLinkComponent,
    AddDetailComponent,
    AddImageComponent,
    SearchResultsComponent,
    FileDropComponent,
    FileInputComponent,
    AddMapComponent,
    PageMapSummaryComponent,
    PageMapsSectionComponent,
    PageMapsComponent,
    MapBackgroundComponent,
    AddMapImageComponent,
    MapForegroundComponent,
    MapOptionsComponent,
    AddPinBtnComponent,
    EditBasicPinProperties,
    EditBasicPinLocation,
    EditablePin
  ],
  providers: [
  	appRoutingProviders,
    DragulaService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
