import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formData: SignupFormData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  onSubmit(): void {
    console.log('Formulaire d\'inscription soumis:', this.formData);
    
    // Simulation d'inscription réussie
    if (isPlatformBrowser(this.platformId)) {
      // Stockage des informations utilisateur uniquement côté client
      localStorage.setItem('user', JSON.stringify({
        id: '123456',
        name: this.formData.fullName,
        email: this.formData.email
      }));
    }
    
    alert('Inscription réussie !');
  }
}
