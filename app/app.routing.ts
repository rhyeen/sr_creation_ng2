import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootContainerComponent }  from './components/root-container.component';

const appRoutes: Routes = [
  { 
    path: 'page/:page_type/:id/:library',
    component: RootContainerComponent
  },
  { 
    path: 'page/:page_type/:id',
    component: RootContainerComponent
  },
  { 
    path: 'page/:page_type',
    component: RootContainerComponent
  },
  { 
    path: 'page',
    component: RootContainerComponent
  },
  { 
    path: '**',
    redirectTo: '/page',
    pathMatch: 'full'
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);