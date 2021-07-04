import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseRestService {

  public buscarTodos(): Observable<Produto[]> {
    return this.getter<Produto[]>('produtos').pipe(take(1));
  }

  public buscarPorId(id: number): Observable<Produto> {
    return this.getter<Produto>(`produtos/${id}`).pipe(take(1));
  }

  public buscarPorGrupo(id: number): Observable<Produto[]> {
    return this.getter<Produto[]>(`produtos?grupoId=${id}`).pipe(take(1));
  }


  public salvar(produto: Produto): Observable<Produto> {
    // Verifica se o produto já tem ID, se tiver chama o PUT para atual, senão o POST para inserir
    if (produto.id) {
      return this.put<Produto>(`produtos/${produto.id}`, produto);
    } else {
      return this.post<Produto>('produtos', produto);
    }
  }

  public excluir(id: number): Observable<void> {
    return this.delete(`produtos/${id}`).pipe(take(1));
  }

}
