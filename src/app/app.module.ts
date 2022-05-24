import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

//COMPONENTES
import { ModalComponent } from './componentes/modal/modal.component';
import { HeaderComponent } from './componentes/header/header.component';
import { EditarPersonaComponent } from './componentes/editar-persona/editar-persona.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { PersonaComponent } from './componentes/persona/persona.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { SocialComponent } from './componentes/social/social.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HeaderComponent,
    EditarPersonaComponent,
    EducacionComponent,
    ExperienciaComponent,
    FooterComponent,
    HabilidadesComponent,
    PersonaComponent,
    ProyectosComponent,
    SocialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgCircleProgressModule.forRoot({}),
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
