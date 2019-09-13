import { Component, OnInit } from '@angular/core';
import { Contato } from 'src/app/model/contato.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endereco } from 'src/app/model/endereco.model';
import { ContatoService } from 'src/app/services/contato/contato.service';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {
  formContato: FormGroup;
  contatoList: Observable<any[]>;
  estadosList: object;

  constructor(private formBuilder: FormBuilder, private contatoService: ContatoService, private utilsService: UtilsService) {
    this.createForm(new Contato());
    this.getContatos();
    this.getEstados();
  }

  ngOnInit() { }

  createForm(contato: Contato) {
    contato.endereco = new Endereco();

    this.formContato = this.formBuilder.group({
      nome: [contato.nome, Validators.required],
      photo: [contato.photo],
      telefone: [contato.telefone, Validators.required],
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

  getEstados() {
    this.utilsService.getEstados().subscribe(data => {
      this.estadosList = data;
    });
  }

}
