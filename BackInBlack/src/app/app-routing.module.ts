import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AllComponent } from './all/all.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'all', component: AllComponent},
  { path: 'add', component: AddComponent},
  { path: 'details/:id/:name', component: DetailsComponent},
  { path: 'edit/:id/:name', component: EditComponent},
  { path: '**', component: AllComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
