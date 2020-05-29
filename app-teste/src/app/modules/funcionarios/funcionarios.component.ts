import { Component, ViewChild } from '@angular/core'
import { FuncionarioService, HabilidadeService } from './funcionario.service'
import { Funcionario, Habilidade } from './funcionario'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog'
import { DialogsComponent } from './dialogs/dialogs.component'

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent {

  dataSource: MatTableDataSource<Funcionario> = null
  habilidades: Habilidade[]
  displayedColumns: string[] = ['id', 'nomeCompleto', 'idade', 'nascimento', 'email', 'sexo', 'status', 'habilidades', 'acoes']
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(funcionarioService: FuncionarioService, habilidadeService: HabilidadeService, public dialog: MatDialog) {
    funcionarioService
      .listar()
      .subscribe(funcionarios => {
        this.dataSource = new MatTableDataSource(funcionarios)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
        err => console.log(err))
    habilidadeService
      .listar()
      .subscribe(habilidades => this.habilidades = habilidades,
        err => console.log(err))
  }

  aplicarFiltro(texto: string) {
    this.dataSource.filter = texto.trim().toLowerCase()
  }

  abrirModalCadastro() {
    this.dialog.open(DialogsComponent, {
      data: {
        id: 0,
        tipoAcao: 'Cadastrar',
        nomeCompleto: '',
        nascimento: null,
        email: '',
        sexo: '',
        ativo: true,
        habilidades: this.habilidades
      }
    })
  }

  abrirModalEdicao(row) {

    let dia = row.nascimento.slice(0,2)
    let mes = row.nascimento.slice(3,5)
    let ano = row.nascimento.slice(6,10)
    this.dialog.open(DialogsComponent, {
      data: {
        id: row.id,
        ativo: row.status === 'Ativo',
        tipoAcao: 'Editar',
        nomeCompleto: row.nomeCompleto,
        nascimento: new Date(ano, mes - 1, dia),
        email: row.email,
        sexo: row.sexo,
        habilidades: this.habilidades
      }
    })
  }
}
