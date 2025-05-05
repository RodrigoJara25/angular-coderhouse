import { Component } from '@angular/core';
import { delay, forkJoin, from, interval, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'proyecto-angular';
  showFiller = false;
  showStudents = true;

  users!: Observable<any[]>;
  user!: Observable<any[]>;

  observables!: Observable<any[]>;

  // Ejemplo: crear un SUBSCRIPTION
  constructor() {
    // crea un observable que emite un numero cada 1s
    const observable = interval(1000);  
    // me suscribo a ese observable y cada vez que este emita algo, ejecuto una funcion
    const subscription = observable.subscribe((value)=>{
      console.log(value);
    });
    // depsues de 5s, cancelo la suscripcion y detengo la emision
    setTimeout(()=>{
      subscription.unsubscribe();
    }, 5000)

    // PIPE ASYNC
    // convertimos la promesa en observable (de tipo any)
    this.observables = forkJoin([
      from(
        fetch("https:\\jsonplaceholder.typicode.com/users").then((res)=>
          res.json()
        )
      ),
      this.getUser(),
    ])

    this.user = this.getUser();
  }

  toggleStudents() {
    this.showStudents = !this.showStudents;
  }

  getUser(): Observable<any> {
    return of({
      username: 'John Doe',
      role: 'admin',
    }).pipe(
      delay(2000)
    )
  }
}
