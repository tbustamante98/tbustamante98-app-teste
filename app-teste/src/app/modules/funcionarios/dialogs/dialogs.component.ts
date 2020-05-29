import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Validators, FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms'
import { Habilidade } from '../funcionario'
import { FuncionarioService } from '../funcionario.service'
import { Router } from '@angular/router'
import { idadeValidator } from 'src/app/shared/validators/idade.validator'

export interface DialogData {
  id: number
  ativo: boolean
  tipoAcao: string
  nomeCompleto: string
  nascimento: Date
  email: string
  sexo: string
  status: string
  habilidades: Habilidade[]
}

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {
  form: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private funcionarioService: FuncionarioService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.data.id],
      ativo: [this.data.ativo],
      email: [this.data.email, Validators.email],
      nomeCompleto: [this.data.nomeCompleto, [Validators.required, Validators.pattern(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/)]],
      nascimento: [this.data.nascimento, idadeValidator],
      sexo: [this.data.sexo, Validators.required],
      habilidades: ['', Validators.required]
    })
  }

  submeter(formData, formDirective: FormGroupDirective) {
    const funcionario = this.form.getRawValue()
    funcionario.habilidades = this.data.habilidades.filter(h => funcionario.habilidades.includes(h.id))
    if (this.data.tipoAcao === 'Cadastrar')
      this.funcionarioService
        .inserir(funcionario)
        .subscribe(() => {
          formDirective.resetForm()
          this.form.reset()
          if (this.router.url == '/')
            this.router.navigate(['/funcionarios'])
          else
            this.router.navigate([''])
        },
          err => {
            console.log(err)
          })
    else
      this.funcionarioService
        .editar(funcionario)
        .subscribe(() => {
          if (this.router.url == '/')
            this.router.navigate(['/funcionarios'])
          else
            this.router.navigate([''])
        },
          err => {
            console.log(err)
          })
  }
}
