
import { Preco, Produto } from '../models/produto.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { hasErrors, validateAllFormFields } from 'src/app/shared/helpers/iu.helper';
import { ProdutoService } from '../services/produto.service';
import { Grupo } from '../../grupo/models/grupo.model';
import { GrupoService } from '../../grupo/services/grupo.service';

@Component({
  selector: 'app-produto-modal',
  templateUrl: './produto-modal.component.html',
  styleUrls: ['./produto-modal.component.scss']
})
export class ProdutoModalComponent implements OnInit {

  @Input()
  produto: Produto | undefined;

  @Output()
  onSave: EventEmitter<Produto> = new EventEmitter<Produto>();

  @Output()
  onDelete: EventEmitter<void> = new EventEmitter<void>();

  formGroup?: FormGroup;

  public grupos : Grupo[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private produtoService: ProdutoService,
    private grupoService : GrupoService
  ) { }

  ngOnInit(): void {
    this.createForm(this.produto || {} as Produto);
    this.carregaGrupos();
  }

  private async carregaGrupos(): Promise<void> {
    this.grupos = await this.grupoService.buscarTodosQuery('').toPromise();
  }

  createForm(produto: Produto) {

    if (produto.ativo === undefined) {
      produto.ativo = false;
    }

    this.formGroup = this.formBuilder.group({
            
      descricao: [
        produto.descricao,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])
      ],
      grupoId: [
          produto.grupoId,
          Validators.compose([Validators.required])
      ],
      ativo: [
        produto.ativo,
        Validators.compose([Validators.required])
      ],
      estoque: [
          produto.estoque,
          Validators.compose([Validators.required])
      ],
      preco: this.createFormPreco(produto.preco || {})
    });
  }

  private createFormPreco(preco: Preco): FormGroup {
    return this.formBuilder.group({
        venda: [
            preco.venda,
            Validators.compose([Validators.required, Validators.minLength(0.01), Validators.maxLength(999999999)])
        ],
        custo: [
            preco.custo,
            Validators.compose([Validators.required, Validators.minLength(0.00), Validators.maxLength(999999999)])
        ]
    });
  }

  public salvar(): void {
    if (this.formGroup?.invalid) {
      this.toastr.error('Campos inválidos ou não preenchidos!');
      validateAllFormFields(this.formGroup);
      return;
    }

    // Pega as informações que estão no formGroup (que são os campos da tela)
    const produtoForm = this.formGroup?.getRawValue();

    // Faz o merge do objeto Produto inicial com os campos alterados na tela
    const produto = { ...this.produto, ...produtoForm };

    // Chama o service para salvar na API
    this.produtoService.salvar(produto)
      .subscribe(result => {
        // Emite o evento que salvou com sucesso e passa o produto que retornou do serviço atualizado
        this.onSave.emit(result);

        // Fecha o modal
        this.activeModal.close();
      }, error => {
        this.toastr.error(error.message);
      });
  }

  public excluir(): void {
    this.produtoService.excluir(this.produto!.id!).subscribe(() => {
      // Emite o evento que excluiu
      this.onDelete.emit();

      //Fecha o modal
      this.activeModal.close();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  public getControl(controlName: string): AbstractControl {
    return this.formGroup?.get(controlName)!;
  }

  hasErrors = hasErrors;

  public getName(item: any): string {
    return item ? `${item.id} - ${item.descricao}` : '';
  }

}
