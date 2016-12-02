import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootContainerComponent }  from './components/root-container.component';

const appRoutes: Routes = [
  { 
    path: 'page/:page_type/:id/:library',
    component: RootContainerComponent,
    data: {
      type: 'page'
    }
  },
  { 
    path: 'page/:page_type/:id',
    component: RootContainerComponent,
    data: {
      type: 'page'
    }
  },
  { 
    path: 'page/:page_type',
    component: RootContainerComponent,
    data: {
      type: 'page'
    }
  },
  { 
    path: 'page',
    component: RootContainerComponent,
    data: {
      type: 'page'
    }
  },
  {
    path: 'article/:id',
    component: RootContainerComponent,
    data: {
      type: 'article'
    }
  },
  { 
    path: '**',
    redirectTo: '/page',
    pathMatch: 'full',
    data: {
      type: 'page'
    }
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);