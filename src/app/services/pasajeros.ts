import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PasajerosService {

  api = 'http://localhost/bella-esmeralda-api';

  constructor(
    private http: HttpClient
  ) {}

  registrarPasajero(datos: any){

    return this.http.post(
      `${this.api}/registrar_pasajero.php`,
      datos
    );

  }

  listarPasajeros(){

    return this.http.get(
      `${this.api}/listar_pasajeros.php`
    );

  }

  eliminarPasajero(id: number){

    return this.http.delete(
      `${this.api}/eliminar_pasajero.php?id=${id}`
    );

  }

  actualizarPasajero(datos: any){

    return this.http.put(
      `${this.api}/editar_pasajero.php`,
      datos
    );

  }

}
