import { LoginService } from 'src/app/servicios/login.service';
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
  
  listaProyectos: any [] = [];
  img_proyecto: any;
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  ulogged: String = "";

  constructor(
    public modal: NgbModal, // Declaro el Modal
    private toastr: ToastrService,
    private loginService: LoginService, // Service Login
    private fb: FormBuilder,
    private crudService: CrudService) {  // Service CRUD
      this.form = this.fb.group({
        titulo_proyecto: ['', Validators.required],
        url_proyecto: ['', Validators.required],
        img_proyecto: ['', Validators.required],
        descripcion_proyecto: ['', Validators.required]
      })
  }

  ngOnInit(): void {
    this.listarProyectos();
    this.ulogged = this.loginService.getUserLogged();
  }

//MÉTODOS DEL MODAL
  abrirEditarProyecto(divModal: any){
    this.modal.open(divModal, { size:'xl', centered:true, scrollable:true });
  }
  abrirImagen(proyectoImagen: any){
    this.modal.open(proyectoImagen, { size:'lg', centered:true, scrollable:false });
  }
  
// CRUD
// Listar Proyectos
  listarProyectos(){
    this.crudService.getListaProyectos().subscribe(data=> {
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
      this.accion = 'Agregar';
      this.crudService.guardarProyecto(proyecto).subscribe(data =>{
        this.toastr.success('Proyecto registrado con éxito!', 'Proyecto Registrado!');
        this.form.reset();
        this.listarProyectos();
      })  
    }else{
      // Si lo anterior no sucede, osea que si existe, entonces Editar Proyecto
      proyecto.id = this.id;
      this.crudService.editarProyecto(this.id, proyecto).subscribe(data => {
        this.accion = 'Editar';
        this.id = undefined;
        this.toastr.info('Proyecto editado con éxito!', 'Proyecto Editado!');
        this.listarProyectos();
      })  
    }
  }
  
  //Editar Proyecto
  editarProyecto(proyecto:any, abreModal:any){
    this.id = proyecto.id;
    this.form.patchValue({
      titulo_proyecto: proyecto.titulo_proyecto,
      url_proyecto: proyecto.url_proyecto,
      img_proyecto: proyecto.img_proyecto,
      descripcion_proyecto: proyecto.descripcion_proyecto
    });
    this.modal.open(abreModal, { size:'xl', centered:true, scrollable:true });
    this.accion = 'Editar';
    this.crudService.editarProyecto(proyecto, proyecto).subscribe(data => {
      this.listaProyectos = data;
      this.id = undefined;
      this.toastr.info('Proyecto editado con éxito!', 'Proyecto Editado!');
      this.listarProyectos();
    })  
  }

//Borrar Proyecto
  borrarProyecto(id: number){
    this.crudService.borrarProyecto(id).subscribe(null, data=> {
      this.id = undefined;
      this.toastr.info('Proyecto eliminado correctamente!','Proyecto Eliminado');
      this.listarProyectos();
    })
  }  

}