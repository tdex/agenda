import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './paginas/page-not-found/page-not-found.component';
import { HomeComponent } from './paginas/home/home.component';
import { ContatosComponent } from './paginas/contatos/contatos.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminGuard } from './admin/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
    canActivate: [AdminGuard]
  },
  {
    path: 'contatos',
    component: ContatosComponent,
    data: { title: 'Meus Contatos' },
    canActivate: [AdminGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
