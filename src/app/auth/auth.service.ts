import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
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

  async login(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['home']);
    }).catch(error => {
      this.tratarErro(error);
    });
  }

  async loginFacebook() {
    await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(response => {
      console.log('LogIn com Gacebook', response.user.email);
      this.router.navigate(['home']);
    }).catch(error => this.tratarErro(error));
  }

  async loginGoogle() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(response => {
      console.log('LogIn com Google', response.user.email);
      this.router.navigate(['home']);
    }).catch(error => this.tratarErro(error));
  }

  async logout() {
    await this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  async register(email: string, password: string) {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.login(email, password);
    }).catch(error => this.tratarErro(error));
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  tratarErro(e: any) {
    console.error(e.code);

    switch (e.code) {
      case 'auth/invalid-email':
        alert('E-mail inválido');
        break;
      case 'auth/wrong-password':
        alert('Senha inválida');
        break;
      case 'auth/user-not-found':
        alert('Usuário não encontrado');
        break;
      case 'auth/account-exists-with-different-credential':
        alert('Já existe uma conta com esse e-mail');
        break;
      case 'auth/email-already-in-use':
        alert('E-mail já cadastrado. Por favor realize o LogIn');
        break;
      default:
        alert('Ocorreu um erro interno. Por favor tente mais tarde!');
        break;
    }
  }

}
