import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootContainerComponent }  from './components/root-container.component';

const appRoutes: Routes = [
  // { path: 'players', component: PlayerListContainerComponent },
  // { path: 'player', component: PlayerListContainerComponent },
  // { path: 'player/:id', component: PlayerListContainerComponent },

  // { path: 'tables', component: TableContainerComponent },
  // { path: 'table', component: TableContainerComponent },
  // { path: 'table/:id', component: TableContainerComponent },

  // { path: 'table/:name', component: RootContainerComponent },
  // {
  //   path: 'heroes',
  //   component: RootContainerComponent,
  //   data: {
  //     title: 'Heroes List'
  //   }
  // // },
  { path: '', component: RootContainerComponent }
  // { path: '**', component: RootContainerComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);