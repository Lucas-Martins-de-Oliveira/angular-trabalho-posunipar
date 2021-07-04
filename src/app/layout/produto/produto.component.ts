import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Produto } from './models/produto.model';
import { ProdutoService } from './services/produto.service';
import { debounceTime } from 'rxjs/operators';
import { ProdutoModalComponent } from './modal/produto-modal.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produtos: Produto[] = [];
  produtosSearch: Produto[] = [];
  searchControl: FormControl = new FormControl();

  // Para todos os service que o componente for usar precisa ser injetado recebendo pelo construtor
  constructor(
    private toastr: ToastrService,
    private produtoService: ProdutoService,
    private modalService: NgbModal
  ) {

    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {

        // Chama a função para filtrar os produtos
        this.filtrarProdutos(value.toLocaleLowerCase());
      });
  }

  ngOnInit(): void {
    // Quando iniciar a tela carrega os produtos através da api
    this.carregaProdutosFromApi();
  }

  private filtrarProdutos(value: string): void {
    // Filtra os produtos e responde no array de produtos filtrados
    this.produtosSearch = this.produtos.filter(p =>
      // coloca o nome do produto em minusculo para ignorar os maiusculos dos minusculos
      p.descricao.toLocaleLowerCase().includes(value)
    );
  }

  private carregaProdutosFromApi(): void {
    this.produtoService.buscarTodos()
      .subscribe(result => {
        // pega o retorno recebido pela api e joga na nossa lista de produtos
        this.produtos = result;

        // Chama a função para filtrar os produtos para trazer toda a lista
        this.filtrarProdutos('');

      }, error => {
        // Deu erro na requisição
        this.toastr.error(error.message, 'Erro');
      });
  }

  public abrirModal(produto: Produto | undefined): void {
    // Instancia o modal
    const modalRef = this.modalService.open(ProdutoModalComponent, { size: 'lg' });

    // Passa o parâmetro do produto para dentro
    modalRef.componentInstance.produto = produto;

    // Pega a resposta quando o usuário salvar no modal
    modalRef.componentInstance.onSave.subscribe((result: Produto) => {
      this.toastr.success('Produto salvo com sucesso!');

      if (!produto?.id) {
        // Se não tiver id no produto de entrada então é uma insert
        this.produtos.push(result);
      } else {
        // Remove o produto anterior e insere o novo
        const idx = this.produtos.findIndex(p => p.id === result!.id);
        this.produtos.splice(idx, 1, result);
      }
      this.limpaPesquisa();
    });

    // Pega a resposta quando o usuário excluír no modal
    modalRef.componentInstance.onDelete.subscribe(() => {
      this.toastr.success('Produto excluído com sucesso!');

      // Acha o produto no array inicial e demove ele
      const idx = this.produtos.findIndex(p => p.id === produto!.id);
      this.produtos.splice(idx, 1);
      this.limpaPesquisa();
    });
  }

  private limpaPesquisa(): void {
    this.searchControl?.setValue('');
  }

}
