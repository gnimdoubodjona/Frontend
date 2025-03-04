import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Agriconnect';

  constructor(private authService: AuthService, private router : Router) {
    
  } 

  ngOnInit(){
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    //this.authService.initializeAuth();
  }
}
