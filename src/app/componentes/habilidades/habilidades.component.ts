import { LoginService } from './../../servicios/login.service';
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
  
  listaHabilidades: any [] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  ulogged: String = "";

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loginService: LoginService, // Service Login
    public modal: NgbModal, // Declaro el Modal
    private crudService: CrudService) {  // Service CRUD
    this.form = this.fb.group({
      porcentaje: ['', Validators.required],
      titulo_habilidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarHabilidades();
    this.ulogged = this.loginService.getUserLogged();
  }

  //MÉTODOS DEL MODAL
  abrirEditarHabilidad(habilidad: any){
    this.modal.open(habilidad, { size:'l', centered:true, scrollable:true });
  }

// CRUD
// Listar Habilidades
  listarHabilidades(){
    this.crudService.getListaHabilidades().subscribe(data=> {
      this.form.reset();
      this.listaHabilidades = data;
   });
  }

// Guardar Habilidad
  guardarHabilidad(){
    const habilidad: any = {
      porcentaje: this.form.get('porcentaje')?.value,
      titulo_habilidad: this.form.get('titulo_habilidad')?.value
    }
    if(this.id == undefined){
      // Si es indefinido o sea que no existe, entonces Agregar Habilidad
      this.crudService.guardarHabilidad(habilidad).subscribe(data =>{
        this.toastr.success('Habilidad registrada con éxito!', 'Habilidad Registrada!');
        this.form.reset();  
        this.listarHabilidades();
      })  
    }else{
      habilidad.id = this.id;
      // Si lo anterior no sucede, osea que si existe, entonces Editar Habilidad
      this.crudService.editarHabilidad(this.id, habilidad).subscribe(data => {
        this.form.reset();
        this.accion = 'Editar';
        this.id = undefined;
        this.toastr.info('Habilidad registrada con éxito!', 'Habilidad Registrada!');
        this.listarHabilidades();
      })  
    }
  }
//Editar Habilidad
  editarHabilidad(habilidad:any, abreModal:any){
    this.id = habilidad.id;
    this.form.patchValue({
      porcentaje: habilidad.porcentaje,
      titulo_habilidad: habilidad.titulo_habilidad
      });
    this.modal.open(abreModal, { size:'xl', centered:true, scrollable:true });
    this.accion = 'Editar';
    this.crudService.editarProyecto(habilidad, habilidad).subscribe(data => {
      this.listaHabilidades = data;
      this.id = undefined;
      this.toastr.info('Proyecto editado con éxito!', 'Proyecto Editado!');
      this.listarHabilidades();
    })  
  }
  
// Borrar Habilidad
  borrarHabilidad(id: number){
    this.crudService.borrarHabilidad(id).subscribe(null, data=> {
      this.id = undefined;
      this.toastr.error('Habilidad eliminada correctamente!','Habilidad Eliminada');
      this.listarHabilidades();
    }) 
  }

}