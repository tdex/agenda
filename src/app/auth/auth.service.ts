import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore, public router: Router) {
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
      if (response.additionalUserInfo.isNewUser) {
        this.addUser(response.user, response.additionalUserInfo.providerId);
      }

      console.log('LogIn com Facebook', response.user.email);
      this.router.navigate(['home']);
    }).catch(error => this.tratarErro(error));
  }

  async loginGoogle() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(response => {
      if (response.additionalUserInfo.isNewUser) {
        this.addUser(response.user, response.additionalUserInfo.providerId);
      }
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
        this.afAuth.auth.fetchSignInMethodsForEmail(e.email).then(res => {
          const method = this.methodType[res[0]];
          alert(`Já existe uma conta com esse e-mail. Tente entrar novamente com o ${method}!`);
        });
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
