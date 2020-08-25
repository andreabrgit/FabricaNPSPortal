import { Cliente } from "../cliente/cliente.model"
import { AvaliacaoProjeto } from "../avaliacao-projeto/avaliacao-projeto.model"

export class Projeto {
    CodProjeto: string
    DescricaoProjeto: string
    IdCliente: number
    Cliente: Cliente
    AvaliacaoProjeto: AvaliacaoProjeto
}