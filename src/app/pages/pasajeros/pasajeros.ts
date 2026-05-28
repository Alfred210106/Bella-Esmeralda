import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PasajerosService } from '../../services/pasajeros';

@Component({
  selector: 'app-pasajeros',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pasajeros.html',
  styleUrl: './pasajeros.css'
})

export class Pasajeros implements OnInit {

  id: number = 0;

  nombre: string = '';
  dni: string = '';
  destino: string = '';
  asiento: string = '';
  fecha: string = '';
  vehiculo: string = '';

  listaPasajeros: any[] = [];

  editando: boolean = false;

  guardando: boolean = false;

  constructor(
    private pasajerosService: PasajerosService
  ) {}

  ngOnInit(): void {

    this.obtenerPasajeros();

  }

  obtenerPasajeros() {

    this.pasajerosService
      .listarPasajeros()
      .subscribe({

        next: (respuesta: any) => {

          console.log(respuesta);

          this.listaPasajeros = respuesta;

        },

        error: (error) => {

          console.log(error);

        }

      });

  }

  registrarPasajero() {

    if(this.guardando){
      return;
    }

    if(
      this.nombre == '' ||
      this.dni == '' ||
      this.destino == '' ||
      this.asiento == '' ||
      this.fecha == '' ||
      this.vehiculo == ''
    ){

      alert('Complete todos los campos');

      return;

    }

    this.guardando = true;

    const datos = {

      id: this.id,
      nombre: this.nombre,
      dni: this.dni,
      destino: this.destino,
      asiento: this.asiento,
      fecha: this.fecha,
      vehiculo: this.vehiculo

    };

    // ACTUALIZAR
    if(this.editando){

      this.pasajerosService
        .actualizarPasajero(datos)
        .subscribe({

          next: (respuesta) => {

            console.log(respuesta);

            alert('Pasajero actualizado correctamente');

            this.obtenerPasajeros();

            this.limpiarFormulario();

            this.guardando = false;

          },

          error: (error) => {

            console.log(error);

            alert('Error al actualizar');

            this.guardando = false;

          }

        });

    }

    // REGISTRAR
    else{

      this.pasajerosService
        .registrarPasajero(datos)
        .subscribe({

          next: (respuesta) => {

            console.log(respuesta);

            alert('Pasajero registrado correctamente');

            this.obtenerPasajeros();

            this.limpiarFormulario();

            this.guardando = false;

          },

          error: (error) => {

            console.log(error);

            alert('Error al registrar');

            this.guardando = false;

          }

        });

    }

  }

  editarPasajero(pasajero: any) {

    this.id = pasajero.id;

    this.nombre = pasajero.nombre;
    this.dni = pasajero.dni;
    this.destino = pasajero.destino;
    this.asiento = pasajero.asiento;
    this.fecha = pasajero.fecha;
    this.vehiculo = pasajero.vehiculo;

    this.editando = true;

  }

  eliminarPasajero(id: number) {

    this.pasajerosService
      .eliminarPasajero(id)
      .subscribe({

        next: (respuesta) => {

          console.log(respuesta);

          alert('Pasajero eliminado correctamente');

          this.obtenerPasajeros();

        },

        error: (error) => {

          console.log(error);

          alert('Error al eliminar');

        }

      });

  }

  limpiarFormulario() {

    this.id = 0;

    this.nombre = '';
    this.dni = '';
    this.destino = '';
    this.asiento = '';
    this.fecha = '';
    this.vehiculo = '';

    this.editando = false;

  }

}