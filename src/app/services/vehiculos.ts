import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VehiculosService {

  api = 'http://localhost/bella-esmeralda-api/';

  constructor(
    private http: HttpClient
  ) {}

  listarVehiculos(){

    return this.http.get(
      this.api + 'listar_vehiculos.php'
    );

  }

  registrarVehiculo(datos:any){

    return this.http.post(
      this.api + 'registrar_vehiculo.php',
      datos
    );

  }

  eliminarVehiculo(id:any){

    return this.http.request(
      'delete',
      this.api + 'eliminar_vehiculo.php',
      {
        body: { id }
      }
    );

  }

}
