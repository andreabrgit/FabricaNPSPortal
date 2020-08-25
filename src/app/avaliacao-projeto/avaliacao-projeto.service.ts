import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { AvaliacaoProjeto, RetornoEstatisticaAvaliacao } from './avaliacao-projeto.model';

@Injectable()
export class AvaliacaoProjetoService {
  constructor(private http: HttpClient) { }

  postAvaliacao(avaliacao: AvaliacaoProjeto): Observable<string> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    var json = JSON.stringify(avaliacao);
    var params = json;

    return this.http.post<string>(`https://fabricanps-poc-webapi.azurewebsites.net/api/AvaliacaoProjeto`, 
    params, { headers: headers })
  }

  getEstatistica(): Observable<RetornoEstatisticaAvaliacao> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this.http.get<RetornoEstatisticaAvaliacao>(`https://fabricanps-poc-webapi.azurewebsites.net/api/AvaliacaoProjeto/Estatistica`, 
    { headers: headers })
  }  
}
