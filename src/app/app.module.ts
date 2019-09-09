import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { firebase } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './interface/menu/menu.component';
import { RodapeComponent } from './interface/rodape/rodape.component';
import { ContatosComponent } from './paginas/contatos/contatos.component';
import { ModalComponent } from './paginas/contatos/modal/modal.component';
import { PageNotFoundComponent } from './paginas/page-not-found/page-not-found.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './auth/login/login.component';

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
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
