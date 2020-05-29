import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Funcionario, Habilidade } from './funcionario'

const API = 'https://localhost:44328/api/funcionarios'

@Injectable({providedIn: 'root'})
export class FuncionarioService {
    constructor(private http:HttpClient) {}

    listar() {
        return this.http.get<Funcionario[]>(API);
    }

    inserir(funcionario) {
        return this.http.post(API, funcionario)
    }

    editar(funcionario) {
        return this.http.put(API, funcionario)
    }
}

@Injectable({providedIn: 'root'})
export class HabilidadeService {
    constructor(private http:HttpClient) {}

    listar() {
        return this.http.get<Habilidade[]>(API + '/habilidades')
    }
}