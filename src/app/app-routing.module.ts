import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './interface/page-not-found/page-not-found.component';
import { HomeComponent } from './interface/home/home.component';
import { ContatosComponent } from './pagina/contatos/contatos.component';
import { LoginComponent } from './interface/login/login.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'contatos',
    component: ContatosComponent,
    data: { title: 'Meus Contatos' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
