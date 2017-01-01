import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootContainerComponent }  from './components/root-container.component';

const appRoutes: Routes = [
  { 
    path: 'library/:id/:library',
    component: RootContainerComponent,
    data: {
      type: 'library'
    }
  },
  { 
    path: 'page/:id',
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
    path: '**',
    redirectTo: '/page',
    pathMatch: 'full'
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);