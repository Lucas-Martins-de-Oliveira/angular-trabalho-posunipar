
import { Grupo } from '../models/grupo.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { hasErrors, validateAllFormFields } from 'src/app/shared/helpers/iu.helper';
import { GrupoService } from '../services/grupo.service';

@Component({
  selector: 'app-grupo-modal',
  templateUrl: './grupo-modal.component.html',
  styleUrls: ['./grupo-modal.component.scss']
})
export class GrupoModalComponent implements OnInit {

  @Input()
  grupo: Grupo | undefined;

  @Output()
  onSave: EventEmitter<Grupo> = new EventEmitter<Grupo>();

  @Output()
  onDelete: EventEmitter<void> = new EventEmitter<void>();

  formGroup?: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private grupoService: GrupoService
  ) { }

  ngOnInit(): void {
    this.createForm(this.grupo || {} as Grupo);
  }

  createForm(grupo: Grupo) {
    this.formGroup = this.formBuilder.group({
      descricao: [
        grupo.descricao,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])
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
    const grupoForm = this.formGroup?.getRawValue();

    // Faz o merge do objeto Grupo inicial com os campos alterados na tela
    const grupo = { ...this.grupo, ...grupoForm };

    // Chama o service para salvar na API
    this.grupoService.salvar(grupo)
      .subscribe(result => {
        // Emite o evento que salvou com sucesso e passa o grupo que retornou do serviço atualizado
        this.onSave.emit(result);

        // Fecha o modal
        this.activeModal.close();
      }, error => {
        this.toastr.error(error.message);
      });
  }

  public excluir(): void {
    this.grupoService.excluir(this.grupo!.id!).subscribe(() => {
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
