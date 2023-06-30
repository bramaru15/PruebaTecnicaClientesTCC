import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';


export const appRoutes: Routes = [
  {
      path: 'list', component: ClienteComponent,
      children: [{ path: '', component: ClienteComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})



export class AppRoutingModule {}
