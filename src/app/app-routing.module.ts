import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { HomeComponent } from './views/home/home.component';
import { ContatosComponent } from './views/contatos/contatos.component';
import { LoginComponent } from './views/login/login.component';
import { AdminGuard } from './services/admin/admin.guard';
import { SobreComponent } from './views/sobre/sobre.component';

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
    path: 'sobre',
    component: SobreComponent,
    data: { title: 'Sobre o site' }
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
