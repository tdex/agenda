import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contato } from 'src/app/model/contato.model';
import { AuthService } from '../auth/auth.service';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(public firestore: AngularFirestore, public authService: AuthService) { }

  async addContato(contato: Contato) {
    await this.firestore.collection('agenda').doc(this.authService.user.email).collection('contatos').add(contato).then(res => {
      console.log('adicionado contato no firebase');
    }).catch(e => {
      console.error('Erro ao cadastrar contato', e);
    });
  }

  async getContatos() {
    const dados = [];
    await this.firestore.collection('agenda').doc('tardchamps94@gmail.com').collection('contatos').get().forEach(item => {

      item.docs.map(contato => {
        console.log(contato.data());
        dados.push(contato.data());
      });

    });

    return dados;
  }
}
