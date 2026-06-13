import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehiculosService } from '../../services/vehiculos';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.css'
})
export class Vehiculos implements OnInit {

  placa: string = '';
  modelo: string = '';
  capacidad: number = 0;          
  tipo: string = '';
  estado: string = '';

  listaVehiculos: any[] = [];
  guardando: boolean = false;

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  obtenerVehiculos() {
    this.vehiculosService.listarVehiculos().subscribe({
      next: (respuesta: any) => {
        console.log(respuesta);
        this.listaVehiculos = respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // Autocompleta la capacidad de asientos según el tipo de unidad
  actualizarCapacidad() {
    if (this.tipo === 'Auto' || this.tipo === 'Minivan') {
      this.capacidad = 4;
    } else if (this.tipo === 'Combi') {
      this.capacidad = 16;
    } else {
      this.capacidad = 0;
    }
  }

  registrarVehiculo() {
    if (this.guardando) return;

    if (
      this.placa.trim() === '' ||
      this.modelo.trim() === '' ||
      this.capacidad <= 0 ||      
      this.tipo.trim() === '' ||
      this.estado.trim() === ''
    ) {
      alert('Complete todos los campos obligatorios');
      return;
    }

    this.guardando = true;

    const datos = {
      placa: this.placa.toUpperCase(), // Se guarda en mayúsculas por seguridad
      modelo: this.modelo,
      capacidad: this.capacidad,
      tipo_unidad: this.tipo,          // Empata con el campo de tu BD en PHP
      estado: this.estado
    };

    this.vehiculosService.registrarVehiculo(datos).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        alert('Vehículo registrado con éxito');
        this.obtenerVehiculos();
        this.limpiarFormulario();
        this.guardando = false;
      },
      error: (error) => {
        console.log(error);
        alert('Ocurrió un error al registrar el vehículo.');
        this.guardando = false;
      }
    });
  }

  eliminarVehiculo(id: any) {
    if (!confirm('¿Está seguro de eliminar este vehículo?')) return;
    this.vehiculosService.eliminarVehiculo(id).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        alert('Vehículo eliminado');
        this.obtenerVehiculos();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  limpiarFormulario() {
    this.placa = '';
    this.modelo = '';
    this.capacidad = 0;
    this.tipo = '';
    this.estado = '';
  }
}