import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ViajesService {

  api = 'http://localhost/bella-esmeralda-api/';

  constructor(
    private http: HttpClient
  ) {}

  listarViajes(){

    return this.http.get(
      this.api + 'listar_viajes.php'
    );

  }

  registrarViaje(datos:any){

    return this.http.post(
      this.api + 'registrar_viaje.php',
      datos
    );

  }

  eliminarViaje(id:any){

    return this.http.request(
      'delete',
      this.api + 'eliminar_viaje.php',
      {
        body: { id }
      }
    );

  }

}
