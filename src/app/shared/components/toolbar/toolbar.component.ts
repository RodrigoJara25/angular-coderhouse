import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'shred-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() drawer!: MatDrawer; 

  private userNameSubject = new BehaviorSubject<string | null>(null); 
  userName$: Observable<string | null> = this.userNameSubject.asObservable();

  ngOnInit(): void {
    // Simulamos el login y emitimos el nombre del usuario después de 3 segundos
    setTimeout(() => {
      this.userNameSubject.next('Rodrigo Jara'); // Cambia "John Doe" por el nombre del usuario logueado
    }, 3000);
  }
}
