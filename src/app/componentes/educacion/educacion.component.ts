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
    this.listarEducaciones();
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.listaInsignias=data.Insignias;
    });
  }
  //MÉTODOS DEL MODAL
  abrirEditarEducacion(educacion: any){
    this.modal.open(educacion, { size:'xl', centered:true, scrollable:true });
  }

  listarEducaciones(){
    this._crudService.getListaEducaciones().subscribe(data=> {
      console.log(data);
      this.listaEducaciones = data;
//    }, error => {
//      console.log(error);
   })
  }

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
      // Agregar Educacion
      this._crudService.guardarEducacion(educacion).subscribe(data =>{
        this.toastr.success('Educacion registrada con éxito!', 'Educacion Registrada!');
        this.listarEducaciones();
        this.form.reset();  
 //     }, error =>{
 //       this.toastr.error('Ocurrió un error', 'Error')
 //       console.log(error);
      })  
    }else{
      educacion.id = this.id;
      // Editar Educacion
      this._crudService.editarEducacion(this.id, educacion).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('Educacion registrada con éxito!', 'Educacion Registrada!');
        this.listarEducaciones();
//      }, error =>{
//        this.toastr.error('Ocurrió un error', 'Error')
//        console.log(error);
      })  
    }
  }

  borrarEducacion(id: number){
    this._crudService.borrarEducacion(id).subscribe(data=> {
      this.toastr.error('Educacion eliminada correctamente!','Educacion Eliminada');
      this.listarEducaciones();
//    }, error => {
//      console.log(error);
    })
  }  
  editarEducacion(educacion: any){
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