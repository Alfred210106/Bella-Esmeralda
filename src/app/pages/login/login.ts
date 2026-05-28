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

  constructor(
    private router: Router
  ){}

  iniciarSesion(){

    if(
      this.usuario == 'admin' &&
      this.password == '123456'
    ){

      alert('Bienvenido a Bella Esmeralda');

      this.router.navigate(['/dashboard']);

    }else{

      alert('Usuario o contraseña incorrectos');

    }

  }

}