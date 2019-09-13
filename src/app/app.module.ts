import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { firebase } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './views/interface/menu/menu.component';
import { RodapeComponent } from './views/interface/rodape/rodape.component';
import { ContatosComponent } from './views/contatos/contatos.component';
import { ModalComponent } from './views/contatos/modal/modal.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SobreComponent } from './views/sobre/sobre.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { OrderModule } from 'ngx-order-pipe';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    ContatosComponent,
    ModalComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    SobreComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    NgxMaskModule.forRoot(options),
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
