import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'grupos', loadChildren: () => import('./grupo/grupo.module').then(m => m.GrupoModule) },
      { path: 'produtos', loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule) },
      { path: 'clientes', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },

      { path: '*', redirectTo: 'home' } // Utilizado o * para quando a rota não existir
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
