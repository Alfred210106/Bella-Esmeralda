import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario: string = '';
  password: string = '';
  
  // Variables de control de errores
  mostrarError: boolean = false;
  mensajeError: string = '';
  errorUsuario: boolean = false;
  errorPassword: boolean = false;

  // Nuevas variables de experiencia de usuario
  ocultarPassword: boolean = true; // Controla el ojo
  cargando: boolean = false;       // Controla el botón de carga

  constructor(private router: Router) {}

  // Limpia los errores visuales individualmente mientras el usuario escribe
  limpiarErrorCampo(campo: 'usuario' | 'password') {
    if (campo === 'usuario') {
      this.errorUsuario = false;
    } else if (campo === 'password') {
      this.errorPassword = false;
    }
    
    // Si ya no quedan campos con error, ocultamos la alerta general
    if (!this.errorUsuario && !this.errorPassword) {
      this.mostrarError = false;
    }
  }

  iniciarSesion() {
    // Reiniciamos estados de error antes de validar
    this.errorUsuario = false;
    this.errorPassword = false;
    this.mostrarError = false;

    // 1. Validar campos vacíos con feedback visual individual
    if (!this.usuario.trim()) {
      this.errorUsuario = true;
    }
    if (!this.password.trim()) {
      this.errorPassword = true;
    }

    if (this.errorUsuario || this.errorPassword) {
      this.mensajeError = 'Por favor, complete los campos marcados en rojo.';
      this.mostrarError = true;
      return;
    }

    // 2. Activar animación de carga para simular respuesta del servidor
    this.cargando = true;

    setTimeout(() => {
      // 3. Control de acceso tradicional
      if (this.usuario === 'admin' && this.password === 'Esmeralda2026*') {
        this.cargando = false;
        this.router.navigate(['/dashboard']);
      } else {
        // Credenciales incorrectas
        this.cargando = false;
        this.mensajeError = 'Usuario o contraseña incorrectos. Intente de nuevo.';
        this.mostrarError = true;
        this.password = ''; // Limpiar campo por seguridad
      }
    }, 1000); // Retraso de 1 segundo para el efecto profesional de carga
  }
}