import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/servicios/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  listaInsignias:any; // Esta lista es la que conecta al JSON
  listaProyectos: any [] = [];
  img_proyecto: any;
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
      titulo_proyecto: ['', Validators.required],
      url_proyecto: ['', Validators.required],
      img_proyecto: ['', Validators.required],
      descripcion_proyecto: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.listarProyectos();
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.listaInsignias=data.Insignias;
    });
  }
  //MÉTODOS DEL MODAL
  abrirEditarProyecto(proyecto: any){
    this.modal.open(proyecto, { size:'xl', centered:true, scrollable:true });
  }
  abrirImagen(proyectoImagen: any){
    this.modal.open(proyectoImagen, { size:'lg', centered:true, scrollable:true });
  }

  listarProyectos(){
    this._crudService.getListaProyectos().subscribe(data=> {
      console.log(data);
      this.listaProyectos = data;
//    }, error => {
//      console.log(error);
   })
  }

  guardarProyecto(){
    const proyecto: any = {
      titulo_proyecto: this.form.get('titulo_proyecto')?.value,
      url_proyecto: this.form.get('url_proyecto')?.value,
      img_proyecto: this.form.get('img_proyecto')?.value,
      descripcion_proyecto: this.form.get('descripcion_proyecto')?.value
    }
    if(this.id == undefined){
      // Agregar Proyecto
      this._crudService.guardarProyecto(proyecto).subscribe(data =>{
        this.toastr.success('Proyecto registrado con éxito!', 'Proyecto Registrado!');
        this.listarProyectos();
        this.form.reset();  
 //     }, error =>{
 //       this.toastr.error('Ocurrió un error', 'Error')
 //       console.log(error);
      })  
    }else{
      proyecto.id = this.id;
      // Editar Proyecto
      this._crudService.editarProyecto(this.id, proyecto).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('Proyecto registrado con éxito!', 'Proyecto Registrado!');
        this.listarProyectos();
//      }, error =>{
//        this.toastr.error('Ocurrió un error', 'Error')
//        console.log(error);
      })  
    }
  }

  borrarProyecto(id: number){
    this._crudService.borrarProyecto(id).subscribe(data=> {
      this.toastr.error('Proyecto eliminado correctamente!','Proyecto Eliminado');
      this.listarProyectos();
//    }, error => {
//      console.log(error);
    })
  }  
  editarProyecto(proyecto: any){
    this.accion = 'Editar';
    this.id = proyecto.id;
    this.form.patchValue({
      titulo_proyecto: proyecto.titulo_proyecto,
      url_proyecto: proyecto.url_proyecto,
      img_proyecto: proyecto.img_proyecto,
      descripcion_proyecto: proyecto.descripcion_proyecto
    })
  }

}