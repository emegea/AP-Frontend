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
  
  listaInsignias:any; // Esta lista es la que conecta al JSON
  listaEducaciones: any [] = [];
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
    this.listarEducaciones();
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.listaInsignias=data.Insignias;
    });
    this.ulogged = this.LoginService.getUserLogged();
  }

  //MÉTODOS DEL MODAL
  abrirEditarEducacion(educacion: any){
    this.modal.open(educacion, { size:'s', centered:true, scrollable:true });
  }

// CRUD
// Listar Proyectos
  listarEducaciones(){
    this._crudService.getListaEducaciones().subscribe(data=> {
      this.form.reset();
      this.listaEducaciones = data;
   });
  }

// Guardar Educación
  guardarEducacion(){
    const educacion: any = {
      fecha_inicio: this.form.get('fecha_inicio')?.value,
      fecha_fin: this.form.get('fecha_fin')?.value,
      img_empresa: this.form.get('img_empresa')?.value,
      localidad_empresa: this.form.get('localidad_empresa')?.value,
      nombre_empresa: this.form.get('nombre_empresa')?.value,
      puesto: this.form.get('puesto')?.value,
      url_empresa: this.form.get('url_empresa')?.value
    }
    if(this.id == undefined){
      // Si es indefinido o sea que no existe, entonces Agregar Educación
      this._crudService.guardarEducacion(educacion).subscribe(data =>{
        this.toastr.success('Educacion registrada con éxito!', 'Educacion Registrada!');
        this.listarEducaciones();
        this.form.reset();  
      }, error =>{
        this.toastr.error('Ocurrió un error', 'Error');
      })  
    }else{
      // Si lo anterior no sucede, osea que si existe, entonces Editar Educación
      educacion.id = this.id;
      this._crudService.editarEducacion(this.id, educacion).subscribe(data => {
        this.form.reset();
        this.accion = 'Editar';
        this.id = undefined;
        this.toastr.info('Educacion registrada con éxito!', 'Educacion Registrada!');
        this.listarEducaciones();
      })  
    }
  }

//Borrar Educación
  borrarEducacion(id: number){
    this._crudService.borrarEducacion(id).subscribe(data=> {
      this.toastr.error('Educacion eliminada correctamente!','Educacion Eliminada');
      this.listarEducaciones();
    }, error => {
      this.toastr.error('Ocurrió un error', 'Error');
    })
    this.form.reset();
  }

//Editar Proyecto
  editarEducacion(educacion: any){
    this.form.reset();
    this.accion = 'Editar';
    this.id = educacion.id;
    this.form.patchValue({
      fecha_inicio: educacion.fecha_inicio,
      fecha_fin: educacion.fecha_fin,
      img_empresa: educacion.img_empresa,
      localidad_empresa: educacion.localidad_empresa,
      nombre_empresa: educacion.nombre_empresa,
      puesto: educacion.puesto,
      url_empresa: educacion.url_empresa
    })
  }

}