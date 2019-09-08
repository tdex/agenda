import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { firebase } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './interface/menu/menu.component';
import { RodapeComponent } from './interface/rodape/rodape.component';
import { ContatosComponent } from './pagina/contatos/contatos.component';
import { ModalComponent } from './pagina/contatos/modal/modal.component';
import { PageNotFoundComponent } from './interface/page-not-found/page-not-found.component';
import { HomeComponent } from './interface/home/home.component';
import { LoginComponent } from './interface/login/login.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    ContatosComponent,
    ModalComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAuthFirebaseUIModule.forRoot(firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
