import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DemoCapitalizeFisrtComponent } from './components/demo-capitalize-fisrt/demo-capitalize-fisrt.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'demo',
    component: DemoCapitalizeFisrtComponent
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
