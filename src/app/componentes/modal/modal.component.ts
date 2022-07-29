import { Component, OnInit } from '@angular/core';
import{ NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor( public modal: NgbModal ) { }

  ngOnInit(): void {
  }
  //MÉTODOS QUE ABREN EL MODAL EN DISTINTOS TAMAÑOS
  abrirChico(contenido: any){
    this.modal.open(contenido, { size:'sm', centered:true, scrollable:true });
  }
  abrirMediano(contenido: any){
    this.modal.open(contenido, { size:'lg', centered:true, scrollable:true });
  }
  abrirGrande(contenido: any){
    this.modal.open(contenido, { size:'xl', centered:true, scrollable:true });
  }

}
