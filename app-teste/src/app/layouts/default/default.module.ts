import { NgModule, LOCALE_ID } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DefaultComponent } from './default.component'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDividerModule } from '@angular/material/divider'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatSortModule } from '@angular/material/sort'
import { FuncionariosComponent } from 'src/app/modules/funcionarios/funcionarios.component'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DialogsComponent } from 'src/app/modules/funcionarios/dialogs/dialogs.component'
import { MatSelectModule } from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms'
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import {MatCheckboxModule} from '@angular/material/checkbox'

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    DefaultComponent,
    FuncionariosComponent,
    DialogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class DefaultModule { }
