import { Component, OnInit } from '@angular/core';
import { Contato } from 'src/app/model/contato.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Endereco } from 'src/app/model/endereco.model';
import { ContatoService } from 'src/app/services/contato/contato.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {
  formContato: FormGroup;
  contatoList: Observable<any[]>;

  constructor(private formBuilder: FormBuilder, private contatoService: ContatoService) {
    this.createForm(new Contato());
    this.getContatos();
  }

  ngOnInit() { }

  createForm(contato: Contato) {
    contato.endereco = new Endereco();

    this.formContato = this.formBuilder.group({
      nome: [contato.nome],
      photo: [contato.photo],
      telefone: [contato.telefone],
      endereco: this.formBuilder.group({
        logradouro: [contato.endereco.logradouro],
        cidade: [contato.endereco.cidade],
        estado: [contato.endereco.estado],
        cep: [contato.endereco.cep]
      })
    });
  }

  cadastrar() {
    this.contatoService.addContato(this.formContato.value);
    this.createForm(new Contato());
  }

  getContatos() {
    this.contatoService.getContatos().then(data => this.contatoList = data);
  }

}
