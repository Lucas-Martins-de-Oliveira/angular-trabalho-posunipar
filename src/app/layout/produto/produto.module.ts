import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoModalComponent } from './modal/produto-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoRoutingModule } from './produto-routing-module';
import { ProdutoComponent } from './produto.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    ProdutoComponent,
    ProdutoModalComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ProdutoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    CurrencyMaskModule
  ],
  entryComponents: [
    ProdutoModalComponent
  ]
})
export class ProdutoModule { }
