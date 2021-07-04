import { Component, OnDestroy, OnInit } from '@angular/core';
import { GrupoService } from '../grupo/services/grupo.service';
import { ProdutoService } from '../produto/services/produto.service';
import { InfoChartViewModel } from './models/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public produtosPorGrupo: InfoChartViewModel =
    {
      loading: true,
      datasets: [],
      labels: []
    };

  constructor(
    private grupoService : GrupoService,
    private produtoService : ProdutoService
  ) { }

  ngOnInit(): void {    
    this.buscarDadosGraficoAsync();
  }

  ngOnDestroy(): void {

  }

  buscarDadosGraficoAsync(): void {
    this.produtosPorGrupo = { loading: true, datasets: [], labels: [] };

    this.grupoService.buscarTodos().subscribe(async (value) => {
      const labels = value.map(g => g.descricao);
      this.produtosPorGrupo.labels = labels;

      const quantidades: number[] = [];

      for (const grupo of value) {

        const produtos = await this.produtoService.buscarPorGrupo(grupo.id).toPromise();

        quantidades.push(produtos.length);
      }

      // Quantidades
      this.produtosPorGrupo.datasets = [
        { data: quantidades, label: 'Quantidade' }
      ];

      this.produtosPorGrupo.loading = false;

    });
  }


}