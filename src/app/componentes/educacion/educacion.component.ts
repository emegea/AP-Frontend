import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/servicios/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  
  listaEducaciones: any [] = [];
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
        institucion: ['', Validators.required],
        img_diploma: ['', Validators.required],
        localidad: ['', Validators.required],
        titulo_educacion: ['', Validators.required],
        url_diploma: ['', Validators.required],
      })
  }

  ngOnInit(): void {
    this.listarEducaciones();
    this.ulogged = this.loginService.getUserLogged();
  }

  //MÉTODOS DEL MODAL
  abrirEditarEducacion(educacion: any){
    this.modal.open(educacion, { size:'s', centered:true, scrollable:true });
  }

// CRUD
// Listar Educaciones
  listarEducaciones(){
    this.crudService.getListaEducaciones().subscribe(data=> {
      this.form.reset();
      this.listaEducaciones = data;
   });
  }

// Guardar Educación
  guardarEducacion(){
    const educacion: any = {
      fecha_inicio: this.form.get('fecha_inicio')?.value,
      fecha_fin: this.form.get('fecha_fin')?.value,
      institucion: this.form.get('institucion')?.value,
      img_diploma: this.form.get('img_diploma')?.value,
      localidad: this.form.get('localidad')?.value,
      titulo_educacion: this.form.get('titulo_educacion')?.value,
      url_diploma: this.form.get('url_diploma')?.value
    }
    if(this.id == undefined){
      // Si es indefinido o sea que no existe, entonces Agregar Educación
      this.accion =' Agregar';
      this.crudService.guardarEducacion(educacion).subscribe(data =>{
        this.toastr.success('Educacion registrada con éxito!', 'Educacion Registrada!');
        this.form.reset();
        this.listarEducaciones();
      })  
    }else{
      // Si lo anterior no sucede, osea que si existe, entonces Editar Educación
      educacion.id = this.id;
      this.crudService.editarEducacion(this.id, educacion).subscribe(data => {
        this.accion = 'Editar';
        this.id = undefined;
        this.toastr.info('Educacion editada con éxito!', 'Educacion Editada!');
        this.listarEducaciones();
      })  
    }
  }

//Editar Educación
  editarEducacion(educacion: any, abreModal: any){
    this.id = educacion.id;
    this.form.patchValue({
      fecha_inicio: educacion.fecha_inicio,
      fecha_fin: educacion.fecha_fin,
      institucion: educacion.institucion,
      img_diploma: educacion.img_diploma,
      localidad: educacion.localidad,
      titulo_educacion: educacion.titulo_educacion,
      url_diploma: educacion.url_diploma
    });
    this.modal.open(abreModal, { size:'xl', centered:true, scrollable:true });
    this.accion = 'Editar';
    this.crudService.editarEducacion(educacion, educacion).subscribe(data => {
      this.listaEducaciones = data;
      this.id = undefined;
      this.toastr.info('Educación editada con éxito!', 'Educación Editada!');
      this.listarEducaciones();
    })  
  }

  //Borrar Educación
  borrarEducacion(id: number){
    this.crudService.borrarEducacion(id).subscribe(null, data=> {
      this.id = undefined;
      this.toastr.info('Educación eliminada correctamente!','Educación Eliminada');
      this.listarEducaciones();
    })
  } 

}