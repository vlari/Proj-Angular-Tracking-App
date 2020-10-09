import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackagelistComponent } from './packagelist/packagelist.component';
import { RatecalculatorComponent } from './ratecalculator/ratecalculator.component';

const routes: Routes = [
  {
    path: '',
    component: PackagelistComponent
  },
  {
    path: 'calculator',
    component: RatecalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
