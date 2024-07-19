import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'selectores';
  private router = inject(Router);



  goto(path: string){
    this.router.navigate([path]);
  }
}
