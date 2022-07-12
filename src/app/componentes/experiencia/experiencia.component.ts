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
  
  listaInsignias:any; // Esta lista es la que conecta al JSON
  listaExperiencias: any [] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  ulogged: String = "";

  constructor(
    private datosPortfolio:CrudService, //Acá llamo al service que carga el Json
    public modal: NgbModal, // Declaro el Modal
    private fb: FormBuilder,
    private toastr: ToastrService,
    private LoginService: LoginService,
    private _crudService: CrudService) { 
    this.form = this.fb.group({
      acerca_de: ['', Validators.required],
      apellido: ['', Validators.required],
      ciudad: ['', Validators.required],
      email: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      nombre: ['', Validators.required],
      pais: ['', Validators.required],
      provincia: ['', Validators.required],
      puesto: ['', Validators.required],
      telefono: ['', Validators.required],
      url_img: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.listarExperiencias();
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.listaInsignias=data.Insignias;
    });
    this.ulogged = this.LoginService.getUserLogged();
  }

  //MÉTODOS DEL MODAL
  abrirEditarExperiencia(experiencia: any){
    this.modal.open(experiencia, { size:'s', centered:true, scrollable:true });
  }

// CRUD
// Listar Experiencias
  listarExperiencias(){
    this._crudService.getListaExperiencias().subscribe(data=> {
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
      this._crudService.guardarExperiencia(experiencia).subscribe(data =>{
        this.toastr.success('Experiencia registrada con éxito!', 'Experiencia Registrada!');
        this.listarExperiencias();
        this.form.reset();  
      })  
    }else{
      // Si lo anterior no sucede, osea que si existe, entonces Editar Proyecto
      experiencia.id = this.id;
      this._crudService.editarExperiencia(this.id, experiencia).subscribe(data => {
        this.form.reset();
        this.accion = 'Editar';
        this.id = undefined;
        this.toastr.info('Experiencia registrada con éxito!', 'Experiencia Registrada!');
        this.listarExperiencias();
      })  
    }
  }

// Borrar Experiencia  
  borrarExperiencia(id: number){
    this._crudService.borrarExperiencia(id).subscribe(data=> {
      this.toastr.error('Experiencia eliminada correctamente!','Experiencia Eliminada');
      this.listarExperiencias();
    }, error => {
      this.toastr.error('Ocurrió un error', 'Error');
    })
    this.form.reset();
  }  

// Editar Experiencia  
  editarExperiencia(experiencia: any){
    this.form.reset();
    this.accion = 'Editar';
    this.id = experiencia.id;
    this.form.patchValue({
      fecha_inicio: experiencia.fecha_inicio,
      fecha_fin: experiencia.fecha_fin,
      img_empresa: experiencia.img_empresa,
      localidad_empresa: experiencia.localidad_empresa,
      nombre_empresa: experiencia.nombre_empresa,
      puesto: experiencia.puesto,
      url_empresa: experiencia.url_empresa

    })
  }

}