import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EncomiendasService {

  api = 'http://localhost/bella-esmeralda-api/';

  constructor(
    private http: HttpClient
  ) {}

  listarEncomiendas(){

    return this.http.get(
      this.api + 'listar_encomiendas.php'
    );

  }

  registrarEncomienda(datos:any){

    return this.http.post(
      this.api + 'registrar_encomienda.php',
      datos
    );

  }

  eliminarEncomienda(id:any){

    return this.http.request(
      'delete',
      this.api + 'eliminar_encomienda.php',
      {
        body: { id }
      }
    );

  }

}
