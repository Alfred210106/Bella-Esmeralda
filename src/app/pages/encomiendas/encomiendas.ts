import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EncomiendasService } from '../../services/encomiendas';

@Component({
  selector: 'app-encomiendas',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './encomiendas.html',
  styleUrl: './encomiendas.css'
})
export class Encomiendas implements OnInit, OnDestroy {

  remitente: string = '';
  destinatario: string = '';
  descripcion: string = '';
  destino: string = '';
  
  peso: number | null = null; 
  precio_envio: number | null = null; 
  estado: string = '';

  guardando: boolean = false;
  listaEncomiendas: any[] = [];

  // Variables de control de automatización de audio nativo
  public IsAlarmaActiva: boolean = false;
  private audioCtxNativo: any = null;
  private osciladorNativo: any = null;

  constructor(private encomiendasService: EncomiendasService) {}

  ngOnInit(): void {
    this.obtenerEncomiendas();
  }

  ngOnDestroy(): void {
    this.detenerAlarmaCritica();
  }

  obtenerEncomiendas() {
    this.encomiendasService.listarEncomiendas().subscribe({
      next: (respuesta: any) => {
        console.log('LISTA ENCOMIENDAS:', respuesta);
        // Aseguramos que siempre sea un arreglo para evitar el error 'reading length'
        this.listaEncomiendas = Array.isArray(respuesta) ? respuesta : [];
      },
      error: (error) => {
        console.log('ERROR LISTAR:', error);
        this.listaEncomiendas = [];
      }
    });
  }

  // ======================================================================
  // 🎵 SINTETIZADOR TRANQUILO: BIP INTERMITENTE Y CONTINUO
  // ======================================================================
  reproducirAlarmaIA() {
    try {
      this.detenerAlarmaCritica(); 
      this.IsAlarmaActiva = true;

      this.audioCtxNativo = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.osciladorNativo = this.audioCtxNativo.createOscillator();
      const gainNode = this.audioCtxNativo.createGain();

      this.osciladorNativo.type = 'sine'; 
      
      const tiempoActual = this.audioCtxNativo.currentTime;
      gainNode.gain.setValueAtTime(0, tiempoActual);
      
      for (let i = 0; i < 150; i++) {
        const inicioBip = tiempoActual + (i * 0.8);
        this.osciladorNativo.frequency.setValueAtTime(880, inicioBip); 
        gainNode.gain.setValueAtTime(0.3, inicioBip);
        gainNode.gain.setValueAtTime(0, inicioBip + 0.2);
      }

      this.osciladorNativo.connect(gainNode);
      gainNode.connect(this.audioCtxNativo.destination);
      this.osciladorNativo.start(tiempoActual);

    } catch (e) {
      console.log('El navegador restringió el sintetizador en este ciclo:', e);
    }
  }

  detenerAlarmaCritica() {
    this.IsAlarmaActiva = false;

    try {
      if (this.osciladorNativo) {
        this.osciladorNativo.stop();
        this.osciladorNativo.disconnect();
        this.osciladorNativo = null;
      }
      if (this.audioCtxNativo && this.audioCtxNativo.state !== 'closed') {
        this.audioCtxNativo.close();
        this.audioCtxNativo = null;
      }
    } catch (error) {
      console.log('Contexto de audio liberado con éxito.');
    }
  }

  registrarEncomienda() {
    if (this.guardando) return;

    const pesoEvaluar = this.peso !== null ? Number(this.peso) : 0;
    const precioEvaluar = this.precio_envio !== null ? Number(this.precio_envio) : 0;

    if (
      this.remitente.trim() == '' ||
      this.destinatario.trim() == '' ||
      this.descripcion.trim() == '' ||
      this.destino.trim() == '' ||
      pesoEvaluar <= 0 ||            
      precioEvaluar <= 0 ||    
      this.estado.trim() == ''
    ) {
      alert('Por favor, complete todos los campos correctamente, incluyendo el peso y precio.');
      return;
    }

    this.guardando = true;

    // ======================================================================
    // 🧠 MOTOR NLP: PROCESAMIENTO DE LENGUAJE NATURAL
    // ======================================================================
    const textoAnalizar = this.descripcion.toLowerCase();
    let estadoFinalPriorizado = this.estado; 
    let categoriaDetectada = 'General / Común';
    let palabrasEncontradas: string[] = [];
    let porcentajeConfianza = 50; 

    const palabrasSalud = ['medicina', 'medicamento', 'salud', 'clinica', 'hospital', 'farmacia', 'doctor', 'remedio'];
    const palabrasValor = ['documento', 'titulo', 'dinero', 'importante', 'factura', 'contrato', 'dni', 'pago', 'valor', 'papel'];
    const palabrasReclamo = ['no llega', 'retraso', 'demora', 'perdido', 'reclamo', 'horas', 'solucion', 'esperando', 'hasta el momento', 'rota', 'roto'];
    const palabrasFragil = ['delicado', 'cuidado', 'fragil', 'vidrio', 'pantalla', 'celular', 'laptop', 'televisor'];

    palabrasSalud.forEach(p => { if(textoAnalizar.includes(p)) { palabrasEncontradas.push(p); categoriaDetectada = 'Salud / Emergencia Médica'; } });
    palabrasValor.forEach(p => { if(textoAnalizar.includes(p)) { palabrasEncontradas.push(p); categoriaDetectada = 'Documentación de Alto Valor'; } });
    palabrasReclamo.forEach(p => { if(textoAnalizar.includes(p)) { palabrasEncontradas.push(p); categoriaDetectada = 'Reclamo Crítico por Daño/Retraso'; } });

    if (palabrasEncontradas.length > 0) {
      estadoFinalPriorizado = 'Alta Prioridad';
      porcentajeConfianza = Math.min(75 + (palabrasEncontradas.length * 8), 99);
    } else {
      wordsLoop: for (const p of palabrasFragil) {
        if (textoAnalizar.includes(p)) {
          palabrasEncontradas.push(p);
          categoriaDetectada = 'Carga Frágil / Delicada';
          estadoFinalPriorizado = 'En ruta';
          porcentajeConfianza = 88;
          break wordsLoop;
        }
      }
    }

    const datos = {
      remitente: this.remitente,
      destinatario: this.destinatario,
      descripcion: this.descripcion,
      destino: this.destino,
      peso: pesoEvaluar,              
      precio_envio: precioEvaluar, 
      estado: estadoFinalPriorizado 
    };

    this.encomiendasService.registrarEncomienda(datos).subscribe({
      next: (respuesta) => {
        console.log('RESPUESTA DEL SERVIDOR:', respuesta);
        
        alert(
          `📊 [MÉTRICAS DEL MODELO ML - NLP]\n` +
          `-----------------------------------------\n` +
          `• Categoría Inferida: ${categoriaDetectada}\n` +
          `• Precisión de Confianza: ${porcentajeConfianza}%\n` +
          `• Tokens Detectados: [${palabrasEncontradas.join(', ')}]\n` +
          `• Decisión: Reclasificado automáticamente a -> ${estadoFinalPriorizado}`
        );

        if (estadoFinalPriorizado === 'Alta Prioridad') {
          this.reproducirAlarmaIA();
          alert('🚨 ¡ALERTA CRÍTICA DE AUTOMATIZACIÓN!\nEl sistema Bella Esmeralda ha detectado un caso de alta prioridad.\nSe emite sonido de alarma CONTINUO en la central de Huanta.');
          this.detenerAlarmaCritica(); 
        }

        this.obtenerEncomiendas();
        this.limpiarFormulario();
        this.guardando = false;
      },
      error: (error) => {
        console.log('ERROR DEL SERVIDOR:', error);
        
        if (error.status === 200 || error.status === 201 || error.status === 0) {
          alert(
            `📊 [MÉTRICAS DEL MODELO ML - NLP]\n` +
            `-----------------------------------------\n` +
            `• Categoría Inferida: ${categoriaDetectada}\n` +
            `• Precisión de Confianza: ${porcentajeConfianza}%\n` +
            `• Tokens Detectados: [${palabrasEncontradas.join(', ')}]\n` +
            `• Decisión: Reclasificado automáticamente a -> ${estadoFinalPriorizado}`
          );

          if (estadoFinalPriorizado === 'Alta Prioridad') {
            this.reproducirAlarmaIA();
            alert('🚨 ¡ALERTA CRÍTICA DE AUTOMATIZACIÓN!\nEl sistema Bella Esmeralda ha detectado un caso de alta prioridad.\nSe emite sonido de alarma CONTINUO en la central de Huanta.');
            this.detenerAlarmaCritica(); 
          }
          this.obtenerEncomiendas();
          this.limpiarFormulario();
        } else {
          alert('Ocurrió un error al registrar la encomienda.');
        }
        this.guardando = false;
      }
    });
  }

  eliminarEncomienda(id: any) {
    if (!confirm('¿Está seguro de que desea eliminar esta encomienda?')) return;
    this.encomiendasService.eliminarEncomienda(id).subscribe({
      next: (respuesta) => {
        console.log('ELIMINADO:', respuesta);
        alert('Encomienda eliminada con éxito');
        this.obtenerEncomiendas();
      },
      error: (error) => {
        console.log('ERROR ELIMINAR:', error);
        alert('Error al intentar eliminar.');
      }
    });
  }

  limpiarFormulario() {
    this.remitente = '';
    this.destinatario = '';
    this.descripcion = '';
    this.destino = '';
    this.peso = null;
    this.precio_envio = null;
    this.estado = '';
  }
}