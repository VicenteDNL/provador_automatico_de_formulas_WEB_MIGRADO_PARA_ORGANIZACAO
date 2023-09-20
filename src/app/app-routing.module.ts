import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardAdmin } from './painel-controle/guard/admin-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'painel',
    loadChildren: () =>
      import('./painel-controle/painel-controle.module').then(
        m => m.PainelControleModule,
      ),
    canLoad: [AuthGuardAdmin],
  },
  {
    path: 'exercicio',
    loadChildren: () =>
      import('./exercicios/exercicios.module').then(m => m.ExerciciosModule),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
