import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contato } from 'src/app/model/contato.model';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  user: User;

  constructor(public firestore: AngularFirestore, public authService: AuthService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  async addContato(contato: Contato) {
    await this.firestore.collection('agenda').doc(this.user.email).collection('contatos').add(contato).then(res => {
      console.log('adicionado contato no firebase');
    }).catch(e => {
      console.error('Erro ao cadastrar contato', e);
    });
  }

  /**
   * Observa alterações na lista de contatos do usuário logado
   */
  async getContatos() {
    return this.firestore.collection('agenda').doc(this.user.email).collection('contatos').valueChanges();
  }
}
