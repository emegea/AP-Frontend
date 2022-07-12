import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicios/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service'; 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  miPortfolio:any;
  ulogged: String = " ";

  constructor(
    private datosPortfolio:CrudService,
    public modal: NgbModal,
    private loginServ: LoginService
  ) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio=data;
    });

    this.ulogged = this.loginServ.getUserLogged();

  }

  salir(): void {
    this.loginServ.deleteToken();
    this.ulogged="";
    window.location.reload();
  }

  abrirLogin(modalLogin: any){
    this.modal.open(modalLogin, { size:'sm', centered:true, scrollable:true });
  }

}
