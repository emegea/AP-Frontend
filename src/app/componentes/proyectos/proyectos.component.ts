import { LoginService } from './../../servicios/login.service';
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
  ulogged: String = "";

  constructor(
    private datosPortfolio:CrudService, //Acá llamo al service que carga el Json
    public modal: NgbModal, // Declaro el Modal
    private fb: FormBuilder,
    private toastr: ToastrService,
    private LoginServ: LoginService,
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
    this.ulogged = this.LoginServ.getUserLogged();
  }

//MÉTODOS DEL MODAL
  abrirEditarProyecto(proyecto: any){
    this.modal.open(proyecto, { size:'xl', centered:true, scrollable:true });
  }
  abrirImagen(proyectoImagen: any){
    this.modal.open(proyectoImagen, { size:'lg', centered:true, scrollable:false });
  }
  
// CRUD
// Listar Proyectos
  listarProyectos(){
    this._crudService.getListaProyectos().subscribe(data=> {
      this.form.reset();
      this.listaProyectos = data;
   });
  }

// Guardar Proyecto
  guardarProyecto(){
    const proyecto: any = {
      titulo_proyecto: this.form.get('titulo_proyecto')?.value,
      url_proyecto: this.form.get('url_proyecto')?.value,
      img_proyecto: this.form.get('img_proyecto')?.value,
      descripcion_proyecto: this.form.get('descripcion_proyecto')?.value
    }
    if(this.id == undefined){
      // Si es indefinido o sea que no existe, entonces crear(Guardar) Proyecto
      this._crudService.guardarProyecto(proyecto).subscribe(data =>{
        this.toastr.success('Proyecto registrado con éxito!', 'Proyecto Registrado!');
        this.form.reset();
        this.accion = 'Agregar';
        this.listarProyectos();
      })  
    }else{
      // Si lo anterior no sucede, osea que si existe, entonces Editar Proyecto
      proyecto.id = this.id;
      this.accion = 'Editar';
      this._crudService.editarProyecto(this.id, proyecto).subscribe(data => {
        this.form.reset();
        this.id = undefined;
        this.toastr.info('Proyecto editado con éxito!', 'Proyecto Editado!');
        this.listarProyectos();
      })  
    }
  }
  
/*   //Editar Proyecto
  editarProyecto(proyecto: any){
    proyecto.id = this.id;
    this._crudService.editarProyecto(proyecto.id, proyecto).subscribe(data => {
      this.accion = 'Editar';
      this.id = undefined;
      this.toastr.info('Proyecto editado con éxito!', 'Proyecto Editado!');
      this.listarProyectos();
      this.form.reset();
      this.abrirEditarProyecto(proyecto);
    })  
}
 */


  // Editar Proyecto
  editarProyecto(proyecto: any){
    this.abrirEditarProyecto(proyecto.proyecto);
    this.form.patchValue({
      titulo_proyecto: proyecto.titulo_proyecto,
      url_proyecto: proyecto.url_proyecto,
      img_proyecto: proyecto.img_proyecto,
      descripcion_proyecto: proyecto.descripcion_proyecto
    })
    this._crudService.editarProyecto(proyecto.id, proyecto).subscribe(data => {
      this.accion = 'Editar';
      this.id = proyecto.id;
      this.toastr.info('Proyecto editado con éxito!', 'Proyecto Editado!');
      this.listarProyectos();
    })  
    this.form.reset();
    
  }

  // Editar Habilidad
  editarHabilidad(habilidad: any){
    this.accion = 'Editar';
    this.id = habilidad.id;
    this.form.patchValue({
      porcentaje: habilidad.porcentaje,
      titulo_habilidad: habilidad.titulo_habilidad
    })
  }




//Borrar Proyecto
  borrarProyecto(id: number){
    this._crudService.borrarProyecto(id).subscribe(data=> {
      this.toastr.info('Proyecto eliminado correctamente!','Proyecto Eliminado');
      this.listarProyectos();
    }, error => {
      this.toastr.error('Ocurrió un error', 'Error');
    })
    this.form.reset();
    window.location.reload();
  }  

}