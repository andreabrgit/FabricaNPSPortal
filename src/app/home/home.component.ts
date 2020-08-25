import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetoService } from '../projeto/projeto.service'
import { Projeto } from '../projeto/projeto.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvaliacaoProjeto, RetornoEstatisticaAvaliacao } from '../avaliacao-projeto/avaliacao-projeto.model';
import { AvaliacaoProjetoService } from '../avaliacao-projeto/avaliacao-projeto.service';

@Component({
  selector: 'fabricanps-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rate: number = 0
  codProjeto: string
  projeto: Projeto
  avaliacaoRealizada: boolean = false
  retornoEstatisticaAvaliacao: RetornoEstatisticaAvaliacao

  constructor(private route: ActivatedRoute,
    private projetoService: ProjetoService,
    private avaliacaoProjetoService: AvaliacaoProjetoService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.codProjeto = params["p"];

        this.projetoService.getProjeto(this.codProjeto)
          .subscribe(projeto => {
            this.projeto = projeto

            if (this.projeto != null) {
              if (this.projeto.AvaliacaoProjeto != null) {
                this.rate = this.projeto.AvaliacaoProjeto.Nota
                this.avaliacaoRealizada = this.projeto.AvaliacaoProjeto.Realizada
              }
            }
          })
      });

    this.avaliacaoProjetoService.getEstatistica()
      .subscribe(estatistica => {
        this.retornoEstatisticaAvaliacao = estatistica
      })
  }

  controlaEstadoDiv(): string {
    if (this.avaliacaoRealizada)
      return "margin-top: -15px; pointer-events:none; display: flex; flex-flow: row wrap; justify-content: center;"
    else
      return "margin-top: -15px; display: flex; flex-flow: row wrap; justify-content: center"
  }

  enviaAvaliacao() {
    if (this.rate == 0) {
      alert('É preciso escolher a nota antes de cadastrar a avaliação')
      return;
    }

    var avaliacao: AvaliacaoProjeto = new AvaliacaoProjeto()
    avaliacao.CodAvaliacaoProjeto = this.codProjeto
    avaliacao.Nota = this.rate
    avaliacao.Realizada = true

    this.avaliacaoProjetoService.postAvaliacao(avaliacao)
      .subscribe(retorno => {
        alert(retorno["Mensagem"])
        
        this.projetoService.getProjeto(this.codProjeto)
        .subscribe(projeto => {
          this.projeto = projeto

          if (this.projeto != null) {
            if (this.projeto.AvaliacaoProjeto != null) {
              this.rate = this.projeto.AvaliacaoProjeto.Nota
              this.avaliacaoRealizada = this.projeto.AvaliacaoProjeto.Realizada

              this.avaliacaoProjetoService.getEstatistica()
              .subscribe(estatistica => {
                this.retornoEstatisticaAvaliacao = estatistica
              })              
            }
          }
        })
      });
  }

}
