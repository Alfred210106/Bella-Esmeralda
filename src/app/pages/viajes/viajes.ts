import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ViajesService } from '../../services/viajes';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './viajes.html',
  styleUrl: './viajes.css'
})
export class Viajes implements OnInit {

  destino: string = '';
  hora: string = '';
  fecha: string = '';               
  chofer: string = '';
  vehiculo: string = '';
  
  // CORRECCIÓN: Inicializar en null para forzar la selección limpia del usuario
  precio_pasaje: number | null = null;       
  asientos_disponibles: number | null = null;   
  estado: string = 'En Cola';          

  guardando: boolean = false;
  listaViajes: any[] = [];

  constructor(private viajesService: ViajesService) {}

  ngOnInit(): void {
    this.obtenerViajes();
  }

  // Detecta el cambio en las tarifas fijas y asigna la capacidad automáticamente
  actualizarAsientosPorTarifa(): void {
    if (this.precio_pasaje === null) return;
    
    const tarifa = Number(this.precio_pasaje);
    if (tarifa === 10) {
      this.asientos_disponibles = 4;  // Auto / Minivan
    } else if (tarifa === 8) {
      this.asientos_disponibles = 16; // Combi
    }
  }

  obtenerViajes() {
    this.viajesService.listarViajes().subscribe({
      next: (respuesta: any) => {
        console.log(respuesta);
        this.listaViajes = respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  registrarViaje() {
    if (this.guardando) return;

    const precioAEvaluar = this.precio_pasaje !== null ? Number(this.precio_pasaje) : 0;
    const asientosAEvaluar = this.asientos_disponibles !== null ? Number(this.asientos_disponibles) : 0;

    // Validación exhaustiva de campos
    if (
      this.destino.trim() == '' ||
      this.hora.trim() == '' ||
      this.fecha.trim() == '' ||          
      this.chofer.trim() == '' ||
      this.vehiculo.trim() == '' ||
      precioAEvaluar <= 0 ||   
      asientosAEvaluar <= 0 ||
      this.estado.trim() == ''
    ) {
      alert('Por favor, complete todos los campos correctamente seleccionando la tarifa.');
      return;
    }

    this.guardando = true;

    const datos = {
      destino: this.destino,
      hora: this.hora,
      fecha: this.fecha,            
      chofer: this.chofer,
      vehiculo: this.vehiculo,
      precio_pasaje: precioAEvaluar, 
      asientos_disponibles: asientosAEvaluar, 
      estado: this.estado
    };

    this.viajesService.registrarViaje(datos).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        alert('Viaje registrado y puesto en cola correctamente');
        this.obtenerViajes();
        this.limpiarFormulario();
        this.guardando = false;
      },
      error: (error) => {
        console.log(error);
        alert('Error al procesar el registro del viaje.');
        this.guardando = false;
      }
    });
  }

  eliminarViaje(id: any) {
    if (!confirm('¿Seguro que desea eliminar este viaje del itinerario?')) return;
    this.viajesService.eliminarViaje(id).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        alert('Viaje retirado con éxito');
        this.obtenerViajes();
      },
      error: (error) => {
        console.log(error);
        alert('Error al intentar eliminar.');
      }
    });
  }

  limpiarFormulario() {
    this.destino = '';
    this.hora = '';
    this.fecha = '';
    this.chofer = '';
    this.vehiculo = '';
    this.precio_pasaje = null;       // Reset limpio
    this.asientos_disponibles = null; // Reset limpio
    this.estado = 'En Cola';
  }
}