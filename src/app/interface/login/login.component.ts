import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginGoogle() {
    const provider = new auth.GoogleAuthProvider();

    auth().signInWithPopup(provider).then(res => {
      console.log('usuário logado', res.user);

    }).catch(err => console.error(err));
  }

  logOut() {
    auth().signOut().then(() => {
      alert('saiu');
    });
  }

}
