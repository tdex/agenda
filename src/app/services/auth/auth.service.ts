import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  methodType = {
    'facebook.com': 'Facebook',
    'google.com': 'Google'
  };

  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore, public router: Router, public location: Location,
    public ngzone: NgZone) {
    this.afAuth.auth.languageCode = 'pt';
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async loginFacebook() {
    await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(response => {
      if (response.additionalUserInfo.isNewUser) {
        this.addUser(response.user, response.additionalUserInfo.providerId);
      }

      this.ngzone.run(() => {
        console.log('LogIn com Facebook', response.user.email);
        this.router.navigate(['home']);
      });
    }).catch(error => this.tratarErro(error));
  }

  async loginGoogle() {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    await this.afAuth.auth.signInWithPopup(provider).then(response => {
      if (response.additionalUserInfo.isNewUser) {
        this.addUser(response.user, response.additionalUserInfo.providerId);
      }

      this.ngzone.run(() => {
        console.log('LogIn com Google', response.user.email);
        this.router.navigate(['home']);
      });
    }).catch(error => this.tratarErro(error));
  }

  async logout() {
    await this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  async addUser(user: User, provider: string) {
    const dados = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      metodoLogin: provider
    };

    this.firestore.collection('users').doc(user.email).set(dados).then(res => {
      console.log('adicionou user', res);
    }).catch(e => {
      console.error('Erro ao cadastrar novo usuário', e);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  tratarErro(e: any) {
    console.error(e.code);

    switch (e.code) {
      case 'auth/user-not-found':
        alert('Usuário não encontrado');
        break;
      case 'auth/account-exists-with-different-credential':
        this.afAuth.auth.fetchSignInMethodsForEmail(e.email).then(res => {
          const method = this.methodType[res[0]];
          alert(`Já existe uma conta com esse e-mail. Tente entrar novamente com o ${method}!`);
        });
        break;
      default:
        alert('Ocorreu um erro interno. Por favor tente mais tarde!');
        break;
    }
  }

}
