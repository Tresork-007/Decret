import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  // Getter pour un accès facile aux champs du formulaire
  get f() { return this.loginForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    
    // Arrêter si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }
    
    console.log('Formulaire de connexion soumis:', this.loginForm.value);
    
    // Simulation de connexion réussie
    if (isPlatformBrowser(this.platformId)) {
      // Stockage des informations utilisateur uniquement côté client
      localStorage.setItem('user', JSON.stringify({
        id: '123456',
        name: 'Utilisateur Test',
        email: this.loginForm.value.email
      }));
    }
    
    alert('Connexion réussie !');
  }
}
