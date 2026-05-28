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

  placa:string = '';
  modelo:string = '';
  capacidad:string = '';
  tipo:string = '';
  estado:string = '';

  listaVehiculos:any[] = [];

  guardando:boolean = false;

  constructor(
    private vehiculosService: VehiculosService
  ) {}

  ngOnInit(): void {

    this.obtenerVehiculos();

  }

  obtenerVehiculos(){

    this.vehiculosService
      .listarVehiculos()
      .subscribe({

        next:(respuesta:any)=>{

          console.log(respuesta);

          this.listaVehiculos = respuesta;

        },

        error:(error)=>{

          console.log(error);

        }

      });

  }

  registrarVehiculo(){

    if(this.guardando){
      return;
    }

    if(
      this.placa == '' ||
      this.modelo == '' ||
      this.capacidad == '' ||
      this.tipo == '' ||
      this.estado == ''
    ){

      alert('Complete todos los campos');

      return;

    }

    this.guardando = true;

    const datos = {

      placa: this.placa,
      modelo: this.modelo,
      capacidad: this.capacidad,
      tipo: this.tipo,
      estado: this.estado

    };

    this.vehiculosService
      .registrarVehiculo(datos)
      .subscribe({

        next:(respuesta)=>{

          console.log(respuesta);

          alert('Vehículo registrado');

          this.obtenerVehiculos();

          this.limpiarFormulario();

          this.guardando = false;

        },

        error:(error)=>{

          console.log(error);

          this.guardando = false;

        }

      });

  }

  eliminarVehiculo(id:any){

    this.vehiculosService
      .eliminarVehiculo(id)
      .subscribe({

        next:(respuesta)=>{

          console.log(respuesta);

          alert('Vehículo eliminado');

          this.obtenerVehiculos();

        },

        error:(error)=>{

          console.log(error);

        }

      });

  }

  limpiarFormulario(){

    this.placa = '';
    this.modelo = '';
    this.capacidad = '';
    this.tipo = '';
    this.estado = '';

  }

}
