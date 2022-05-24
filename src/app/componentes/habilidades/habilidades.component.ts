import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/servicios/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  
  listaInsignias:any; // Esta lista es la que conecta al JSON
  listaHabilidades: any [] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;

  constructor(
    public modal: NgbModal, // Declaro el Modal
    private datosPortfolio:CrudService, //Acá llamo al service que carga el Json
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _crudService: CrudService) { 
    this.form = this.fb.group({
      porcentaje: ['', Validators.required],
      titulo_habilidad: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.listarHabilidades();
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.listaInsignias=data.Insignias;
    });
  }
  //MÉTODOS DEL MODAL
  abrirEditarHabilidad(habilidad: any){
    this.modal.open(habilidad, { size:'xl', centered:true, scrollable:true });
  }

  listarHabilidades(){
    this._crudService.getListaHabilidades().subscribe(data=> {
      console.log(data);
      this.listaHabilidades = data;
//    }, error => {
//      console.log(error);
   })
  }

  guardarHabilidad(){
    const habilidad: any = {
      porcentaje: this.form.get('porcentaje')?.value,
      titulo_habilidad: this.form.get('titulo_habilidad')?.value
    }
    if(this.id == undefined){
      // Agregar Habilidad
      this._crudService.guardarHabilidad(habilidad).subscribe(data =>{
        this.toastr.success('Habilidad registrada con éxito!', 'Habilidad Registrada!');
        this.listarHabilidades();
        this.form.reset();  
 //     }, error =>{
 //       this.toastr.error('Ocurrió un error', 'Error')
 //       console.log(error);
      })  
    }else{
      habilidad.id = this.id;
      // Editar Habilidad
      this._crudService.editarHabilidad(this.id, habilidad).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('Habilidad registrada con éxito!', 'Habilidad Registrada!');
        this.listarHabilidades();
//      }, error =>{
//        this.toastr.error('Ocurrió un error', 'Error')
//        console.log(error);
      })  
    }
  }

  borrarHabilidad(id: number){
    this._crudService.borrarHabilidad(id).subscribe(data=> {
      this.toastr.error('Habilidad eliminada correctamente!','Habilidad Eliminada');
      this.listarHabilidades();
//    }, error => {
//      console.log(error);
    })
  }  
  editarHabilidad(habilidad: any){
    this.accion = 'Editar';
    this.id = habilidad.id;
    this.form.patchValue({
      porcentaje: habilidad.porcentaje,
      titulo_habilidad: habilidad.titulo_habilidad
    })
  }

}