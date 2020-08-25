import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { Projeto } from './projeto.model';

@Injectable()
export class ProjetoService {
  constructor(private http: HttpClient) { }

  getProjeto(codProjeto: string): Observable<Projeto> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this.http.get<Projeto>(`https://fabricanps-poc-webapi.azurewebsites.net/api/Projeto/${codProjeto}`, { headers: headers })
  }
}
