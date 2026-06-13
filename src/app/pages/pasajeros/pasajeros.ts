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
  viaje_id: number = 0;          
  asiento: string = '';
  
  // Variables ajustadas a la estructura de la base de datos
  tipo_unidad: string = 'Auto'; 
  precio_pasaje: number = 10.00; 

  listaPasajeros: any[] = [];

  editando: boolean = false;
  guardando: boolean = false;

  constructor(
    private pasajerosService: PasajerosService
  ) {}

  ngOnInit(): void {
    this.obtenerPasajeros();
  }

  // AUTOMATIZACIÓN DE TARIFAS
  actualizarTarifa() {
    if (this.tipo_unidad === 'Auto' || this.tipo_unidad === 'Minivan') {
      this.precio_pasaje = 10.00;
    } else if (this.tipo_unidad === 'Combi') {
      this.precio_pasaje = 8.00;
    }
  }

  obtenerPasajeros() {
    this.pasajerosService.listarPasajeros().subscribe({
      next: (respuesta: any) => {
        console.log(respuesta);
        // Si no es un arreglo válido, asigna un array vacío []
        this.listaPasajeros = Array.isArray(respuesta) ? respuesta : [];
      },
      error: (error) => {
        console.log(error);
        this.listaPasajeros = [];
      }
    });
  }

  registrarPasajero() {
    if (this.guardando) return;

    if (
      this.nombre == '' ||
      this.dni == '' ||
      this.viaje_id <= 0 ||        
      this.asiento == '' ||
      this.tipo_unidad == ''
    ) {
      alert('Complete todos los campos');
      return;
    }

    this.guardando = true;

    // Se mapea exactamente lo que el backend enviará a phpMyAdmin
    const datos = {
      id: this.id,
      nombre: this.nombre,
      dni: this.dni,
      viaje_id: this.viaje_id,      
      asiento: this.asiento,
      tipo_unidad: this.tipo_unidad,
      precio_pasaje: this.precio_pasaje
    };

    if (this.editando) {
      this.pasajerosService.actualizarPasajero(datos).subscribe({
        next: (respuesta) => {
          alert('Pasajero y pago actualizados correctamente');
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
    } else {
      this.pasajerosService.registrarPasajero(datos).subscribe({
        next: (respuesta) => {
          alert('Pasajero registrado y pago procesado en Caja');
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
    this.viaje_id = Number(pasajero.viaje_id); 
    this.asiento = pasajero.asiento;
    this.tipo_unidad = pasajero.tipo_unidad ? pasajero.tipo_unidad : 'Auto';
    this.precio_pasaje = pasajero.precio_pasaje ? Number(pasajero.precio_pasaje) : 10.00;
    this.editando = true;
  }

  eliminarPasajero(id: number) {
    if (!confirm('¿Desea eliminar este registro de pasajero?')) return;
    this.pasajerosService.eliminarPasajero(id).subscribe({
      next: (respuesta) => {
        alert('Registro eliminado de la lista');
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
    this.viaje_id = 0;
    this.asiento = '';
    this.tipo_unidad = 'Auto';
    this.precio_pasaje = 10.00;
    this.editando = false;
  }
}