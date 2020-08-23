import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardAdmin } from './painel-controle/guard/admin-auth.guard';


const routes: Routes = [

  { 
    path: 'login', 
    component: LoginComponent 
  },{
    path: 'painel',
     loadChildren: () => import('./painel-controle/painel-controle.module').then(m => m.PainelControleModule),
    canLoad: [AuthGuardAdmin],
  },
    
  {
    path:'**',
    redirectTo: 'painel',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
