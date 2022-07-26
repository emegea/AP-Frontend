import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/servicios/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  listaInsignias:any; // Esta lista es la que conecta al JSON
  listaPersonas: any [] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  ulogged: String = "";

  constructor(
    public modal: NgbModal, // Declaro el Modal
    private toastr: ToastrService,
    private loginService: LoginService, // Service Login
    private fb: FormBuilder,
    private insignias:CrudService, //Acá llamo al service que carga el Json con las insignias
    private crudService: CrudService) {  // Service CRUD
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
    this.listarPersonas();
    this.insignias.obtenerDatos().subscribe(data => {
      this.listaInsignias=data.Insignias;
    });
    this.ulogged = this.loginService.getUserLogged();
  }

  //MÉTODOS DEL MODAL
  abrirEditarPersona(persona: any){
    this.modal.open(persona, { size:'lg', centered:true, scrollable:true });
  }

// CRUD
// Listar Personas
  listarPersonas(){
    this.crudService.getListaPersonas().subscribe(data=> {
      this.form.reset();
      this.listaPersonas = data;
    });
  }

// Guardar Persona
  guardarPersona(){
    const persona: any = {
      acerca_de: this.form.get('acerca_de')?.value,
      apellido: this.form.get('apellido')?.value,
      ciudad: this.form.get('ciudad')?.value,
      email: this.form.get('email')?.value,
      fecha_nac: this.form.get('fecha_nac')?.value,
      nombre: this.form.get('nombre')?.value,
      pais: this.form.get('pais')?.value,
      provincia: this.form.get('provincia')?.value,
      puesto: this.form.get('puesto')?.value,
      telefono: this.form.get('telefono')?.value,
      url_img: this.form.get('url_img')?.value
    }
    if(this.id == undefined){
      // Si es indefinido o sea que no existe, entonces Agregar Persona
      this.crudService.guardarPersona(persona).subscribe(data =>{
        this.toastr.success('Persona registrada con éxito!', 'Persona Registrada!');
        this.listarPersonas();
        this.form.reset();  
      })  
    }else{
      // Si lo anterior no sucede, osea que si existe, entonces Editar Persona
      persona.id = this.id;
      this.crudService.editarPersona(this.id, persona).subscribe(data => {
        this.form.reset();
        this.accion = 'Editar';
        this.id = undefined;
        this.toastr.info('Persona registrada con éxito!', 'Persona Registrada!');
        this.listarPersonas();
      })
    }
  }

  
//Editar Persona
  editarPersona(persona:any, abreModal:any){
    this.id = persona.id;
    this.form.patchValue({
      acerca_de: persona.acerca_de,
      apellido: persona.apellido,
      ciudad: persona.ciudad,
      email: persona.email,
      fecha_nac: persona.fecha_nac,
      nombre: persona.nombre,
      pais: persona.pais,
      provincia: persona.provincia,
      puesto: persona.puesto,
      telefono: persona.telefono,
      url_img: persona.url_img
    });
    this.modal.open(abreModal, { size:'xl', centered:true, scrollable:true });
    this.accion = 'Editar';
    this.crudService.editarProyecto(persona, persona).subscribe(data => {
      this.listaPersonas = data;
      this.id = undefined;
      this.toastr.info('Persona editada con éxito!', 'Persona Editada!');
      this.listarPersonas();
    })  
  }

//Borrar Proyecto
  borrarPersona(id: number){
    this.crudService.borrarPersona(id).subscribe(null, data=> {
      this.id = undefined;
      this.toastr.info('Persona eliminada correctamente!','Persona eliminada');
      this.listarPersonas();
    })
  }  
}