import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';
import { Grupo } from '../models/grupo.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoService extends BaseRestService {

  public buscarTodos(): Observable<Grupo[]> {
    return this.getter<Grupo[]>('grupos').pipe(take(1));
  }

  public buscarTodosQuery(filtros: any): Observable<Grupo[]> {

    // Verifica se tem os parâmetros e vai adicionando no array para jogar na URL
    const query = new Array<string>();
    if (filtros.id) {
      query.push(`id=${filtros.id}`);
    }
    if (filtros.descricao) {
      query.push(`descricao=${filtros.descricao}`);
    }

    const params = query.length > 0 ? '?' + query.join('&') : '';
    return this.getter<Grupo[]>(`grupos?${params}`).pipe(take(1));
  }

  public buscarTodosQuery2(filtros: any): Observable<Grupo[]> {
    const options = {
      params: this.parseObjectToHttpParams(filtros)
    };
    return this.getter<Grupo[]>('grupos', options).pipe(take(1));
  }

  public buscarPorId(id: number): Observable<Grupo> {
    return this.getter<Grupo>(`grupos/${id}`).pipe(take(1));
  }

  public salvar(grupo: Grupo): Observable<Grupo> {
    // Verifica se o grupo já tem ID, se tiver chama o PUT para atual, senão o POST para inserir
    if (grupo.id) {
      return this.put<Grupo>(`grupos/${grupo.id}`, grupo);
    } else {
      return this.post<Grupo>('grupos', grupo);
    }
  }

  public excluir(id: number): Observable<void> {
    return this.delete(`grupos/${id}`).pipe(take(1));
  }
}
