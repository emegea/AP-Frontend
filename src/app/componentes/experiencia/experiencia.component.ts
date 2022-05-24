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

  constructor(
    public modal: NgbModal, // Declaro el Modal
    private datosPortfolio:CrudService, //Acá llamo al service que carga el Json
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _crudService: CrudService) { 
    this.form = this.fb.group({
      acerca_de: ['', Validators.required],
      apellido: ['', Validators.required],
      ciudad: ['', Validators.required],
      email: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      nombre: ['', Validators.required],
//      nombre_usuario: ['', Validators.required],
      pais: ['', Validators.required],
//      password: ['', Validators.required],
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
  }
  //MÉTODOS DEL MODAL
  abrirEditarExperiencia(experiencia: any){
    this.modal.open(experiencia, { size:'xl', centered:true, scrollable:true });
  }

  listarExperiencias(){
    this._crudService.getListaExperiencias().subscribe(data=> {
      console.log(data);
      this.listaExperiencias = data;
//    }, error => {
//      console.log(error);
   })
  }

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
      // Agregar Experiencia
      this._crudService.guardarExperiencia(experiencia).subscribe(data =>{
        this.toastr.success('Experiencia registrada con éxito!', 'Experiencia Registrada!');
        this.listarExperiencias();
        this.form.reset();  
 //     }, error =>{
 //       this.toastr.error('Ocurrió un error', 'Error')
 //       console.log(error);
      })  
    }else{
      experiencia.id = this.id;
      // Editar Experiencia
      this._crudService.editarExperiencia(this.id, experiencia).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('Experiencia registrada con éxito!', 'Experiencia Registrada!');
        this.listarExperiencias();
//      }, error =>{
//        this.toastr.error('Ocurrió un error', 'Error')
//        console.log(error);
      })  
    }
  }

  borrarExperiencia(id: number){
    this._crudService.borrarExperiencia(id).subscribe(data=> {
      this.toastr.error('Experiencia eliminada correctamente!','Experiencia Eliminada');
      this.listarExperiencias();
//    }, error => {
//      console.log(error);
    })
  }  
  editarExperiencia(experiencia: any){
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