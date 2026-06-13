import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PasajerosService } from '../../services/pasajeros';
import { VehiculosService } from '../../services/vehiculos';
import { ViajesService } from '../../services/viajes';
import { EncomiendasService } from '../../services/encomiendas';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  // Indicadores Numéricos del Panel
  totalPasajeros: number = 0;
  totalVehiculos: number = 0;
  totalViajes: number = 0;
  totalEncomiendas: number = 0;
  alertasCriticasIA: number = 0; // 🔥 NUEVA VARIABLE DINÁMICA

  // Lógica del Buscador de Trazabilidad Familiar
  dniBusqueda: string = '';
  pasajeroEncontrado: any = null;
  busquedaRealizada: boolean = false;

  constructor(
    private pasajerosService: PasajerosService,
    private vehiculosService: VehiculosService,
    private viajesService: ViajesService,
    private encomiendasService: EncomiendasService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTotales();
  }

  cargarTotales() {
    this.pasajerosService.listarPasajeros().subscribe((datos: any) => {
      this.totalPasajeros = datos ? datos.length : 0;
    });

    this.vehiculosService.listarVehiculos().subscribe((datos: any) => {
      this.totalVehiculos = datos ? datos.length : 0;
    });

    this.viajesService.listarViajes().subscribe((datos: any) => {
      this.totalViajes = datos ? datos.length : 0;
    });

    // 🔥 MODIFICADO: Ahora cuenta dinámicamente según el estado del NLP
    this.encomiendasService.listarEncomiendas().subscribe((datos: any) => {
      if (datos && Array.isArray(datos)) {
        this.totalEncomiendas = datos.length;
        
        // Filtra y cuenta solo los registros que dicen 'Alta Prioridad'
        this.alertasCriticasIA = datos.filter((e: any) => e.estado === 'Alta Prioridad').length;
      } else {
        this.totalEncomiendas = 0;
        this.alertasCriticasIA = 0;
      }
    });
  }

  buscarPasajeroSeguro() {
    if (!this.dniBusqueda.trim()) return;

    this.busquedaRealizada = true;
    this.pasajerosService.listarPasajeros().subscribe((datos: any) => {
      if (datos && Array.isArray(datos)) {
        const encontrado = datos.find((p: any) => p.dni === this.dniBusqueda.trim());
        
        if (encontrado) {
          this.pasajeroEncontrado = {
            nombre: encontrado.nombre,
            destino: encontrado.destino || 'Destino Programado',
            asiento: encontrado.asiento,
            fecha: encontrado.fecha,
            vehiculo: encontrado.vehiculo || 'Auto Colectivo',
            estadoViaje: 'En Ruta Seguro 🚌'
          };
        } else {
          this.pasajeroEncontrado = null;
        }
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}