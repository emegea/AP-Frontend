import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/servicios/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  
  listaExperiencias: any [] = [];
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
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      img_empresa: ['', Validators.required],
      localidad_empresa: ['', Validators.required],
      nombre_empresa: ['', Validators.required],
      puesto: ['', Validators.required],
      url_empresa: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.listarExperiencias();
    this.ulogged = this.loginService.getUserLogged();
  }

  //MÉTODOS DEL MODAL
  abrirEditarExperiencia(experiencia: any){
    this.modal.open(experiencia, { size:'s', centered:true, scrollable:true });
  }

// CRUD
// Listar Experiencias
  listarExperiencias(){
    this.crudService.getListaExperiencias().subscribe(data=> {
      this.form.reset();
      this.listaExperiencias = data;
    });
  }

// Guardar Experiencia  
  guardarExperiencia(){
    const experiencia: any = {
      fecha_inicio: this.form.get('fecha_inicio')?.value,
      fecha_fin: this.form.get('fecha_fin')?.value,
      img_empresa: this.form.get('img_empresa')?.value,
      localidad_empresa: this.form.get('localidad_empresa')?.value,
      nombre_empresa: this.form.get('nombre_empresa')?.value,
      puesto: this.form.get('puesto')?.value,
      url_empresa: this.form.get('url_empresa')?.value
    }
    if(this.id == undefined){
      // Si es indefinido o sea que no existe, entonces Agregar Experiencia
      this.accion = 'Agregar';
      this.crudService.guardarExperiencia(experiencia).subscribe(data =>{
        this.toastr.success('Experiencia registrada con éxito!', 'Experiencia Registrada!');
        this.form.reset();  
        this.listarExperiencias();
      })  
    }else{
      // Si lo anterior no sucede, osea que si existe, entonces Editar Proyecto
      experiencia.id = this.id;
      this.accion = 'Editar';
      this.crudService.editarExperiencia(this.id, experiencia).subscribe(data => {
        this.id = undefined;
        this.toastr.info('Experiencia registrada con éxito!', 'Experiencia Registrada!');
        this.listarExperiencias();
      })  
    }
  }

  
  // Editar Experiencia  
  editarExperiencia(experiencia:any, abreModal:any){
    this.id = experiencia.id;
    this.form.patchValue({
      fecha_inicio: experiencia.fecha_inicio,
      fecha_fin: experiencia.fecha_fin,
      img_empresa: experiencia.img_empresa,
      localidad_empresa: experiencia.localidad_empresa,
      nombre_empresa: experiencia.nombre_empresa,
      puesto: experiencia.puesto,
      url_empresa: experiencia.url_empresa
    });
    this.modal.open(abreModal, { size:'xl', centered:true, scrollable:true });
    this.accion = 'Editar';
    this.crudService.editarProyecto(experiencia, experiencia).subscribe(data => {
      this.listaExperiencias = data;
      this.id = undefined;
      this.toastr.info('Proyecto editado con éxito!', 'Proyecto Editado!');
      this.listarExperiencias();
    })  
  }

//Borrar Proyecto
borrarExperiencia(id: number){
  this.crudService.borrarExperiencia(id).subscribe(null, data=> {
    this.id = undefined;
    this.toastr.info('Proyecto eliminado correctamente!','Proyecto Eliminado');
    this.listarExperiencias();
  })
}  

}