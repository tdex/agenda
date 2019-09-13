import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }
}
