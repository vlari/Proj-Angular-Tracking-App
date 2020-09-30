import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackagelistComponent } from './packagelist/packagelist.component';

const routes: Routes = [
  {
    path: '',
    component: PackagelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
