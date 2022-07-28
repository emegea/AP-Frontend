import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  constructor(private http: HttpClient) {}

  obtenerDatos():Observable<any>{
    return this.http.get('/assets/data/data.json');
  }

  private urlApi = "https://ap-backend-emegea.herokuapp.com/api/"

  // CRUD PERSONA
  getListaPersonas(): Observable<any> {
    return this.http.get(this.urlApi + 'persona/listar');
  }
  getPersona(id: number): Observable<any> {
    return this.http.get(this.urlApi + 'persona/' + id);
  }
  borrarPersona(id: number): Observable<any> {
    return this.http.delete(this.urlApi + 'persona/borrar/' + id);
  }
  guardarPersona(persona: any): Observable<any> {
    return this.http.post(this.urlApi + 'persona/nueva', persona);
  }
  editarPersona(id: number, persona: any):Observable <any> {
    return this.http.put(this.urlApi + 'persona/editar/' + id, persona, {responseType: 'text'} );
  }

  // CRUD EDUCACIÓN
  getListaEducaciones(): Observable<any> {
    return this.http.get(this.urlApi + 'educacion/listar');
  }
  getEducacion(id: number): Observable<any> {
    return this.http.get(this.urlApi + 'educacion/' + id);
  }
  borrarEducacion(id: number): Observable<any> {
    return this.http.delete(this.urlApi + 'educacion/borrar/' + id);
  }
  guardarEducacion(educacion: any): Observable<any> {
    return this.http.post(this.urlApi + 'educacion/nueva', educacion);
  }
  editarEducacion(id: number, educacion: any):Observable <any> {
    return this.http.put(this.urlApi + 'educacion/editar/' + id, educacion, {responseType: 'text'} );
  }

  // CRUD EXPERIENCIA
  getListaExperiencias(): Observable<any> {
    return this.http.get(this.urlApi + 'experiencia/listar');
  }
  getExperiencia(id: number): Observable<any> {
    return this.http.get(this.urlApi + 'experiencia/' + id);
  }
  borrarExperiencia(id: number): Observable<any> {
    return this.http.delete(this.urlApi + 'experiencia/borrar/' + id);
  }
  guardarExperiencia(experiencia: any): Observable<any> {
    return this.http.post(this.urlApi + 'experiencia/nueva', experiencia);
  }
  editarExperiencia(id: number, experiencia: any):Observable <any> {
    return this.http.put(this.urlApi + 'experiencia/editar/' + id, experiencia, {responseType: 'text'} );
  }

  // CRUD HABILIDAD
  getListaHabilidades(): Observable<any> {
    return this.http.get(this.urlApi + 'habilidad/listar');
  }
  getHabilidad(id: number): Observable<any> {
    return this.http.get(this.urlApi + 'habilidad/' + id);
  }
  borrarHabilidad(id: number): Observable<any> {
    return this.http.delete(this.urlApi + 'habilidad/borrar/' + id);
  }
  guardarHabilidad(habilidad: any): Observable<any> {
    return this.http.post(this.urlApi + 'habilidad/nueva', habilidad);
  }
  editarHabilidad(id: number, habilidad: any):Observable <any> {
    return this.http.put(this.urlApi + 'habilidad/editar/' + id, habilidad, {responseType: 'text'} );
  }

  // CRUD PROYECTO
  getListaProyectos(): Observable<any> {
    return this.http.get(this.urlApi + 'proyecto/listar');
  }
  getProyecto(id: number): Observable<any> {
    return this.http.get(this.urlApi + 'proyecto/' + id);
  }
  borrarProyecto(id: number): Observable<any> {
    return this.http.delete(this.urlApi + 'proyecto/borrar/' + id);
  }
  guardarProyecto(proyecto: any): Observable<any> {
    return this.http.post(this.urlApi + 'proyecto/nueva', proyecto);
  }
  editarProyecto(id: number, proyecto: any):Observable <any> {
    return this.http.put(this.urlApi + 'proyecto/editar/' + id, proyecto, {responseType: 'text'} );
  }
}