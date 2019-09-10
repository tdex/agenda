import { Component, OnInit } from '@angular/core';
import { Contatos } from 'src/app/model/contatos.model';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {
  novo = {
    nome: '',
    telefone: '',
    endereco: {
      logradouro: '',
      cidade: '',
      estado: '',
      cep: ''
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
