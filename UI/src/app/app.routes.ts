import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { LoginComponent } from './login/login.component';
import { PanelcomponentComponent } from './panelcomponent/panelcomponent.component';

export const routes: Routes = [
  // { path: 'maintenance', component: MaintenanceComponent },
  // { path: 'view', component: ViewDataComponent },
  // { path: '', redirectTo: 'maintenance', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },


  { path: '', component: LoginComponent },
  {
    path: 'dashboard', component: PanelcomponentComponent, children: [
      { path: '', component: MaintenanceComponent },
      { path: 'view', component: ViewDataComponent },
      { path: '**', component: PageNotFoundComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  }
];



