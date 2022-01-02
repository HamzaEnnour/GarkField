import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PharesComponent } from './phares/phares.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { ShowTerrainComponent } from './boutique/show-terrain/show-terrain.component';
import { CompteComponent } from './compte/compte.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboards' },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
      { path: 'mes-terrains', component: PharesComponent },
      { path: 'terrains', component: BoutiqueComponent },
      { path: 'compte', component: CompteComponent },
      { path: 'terrains/view/:id', component: ShowTerrainComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
