import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {
  userName: string = 'Utilisateur';
  userEmail: string = 'utilisateur@example.com';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Récupérer les informations utilisateur depuis le localStorage ou un service
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user && user.name) {
        this.userName = user.name;
      }
      if (user && user.email) {
        this.userEmail = user.email;
      }
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Supprimer les données de session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
}
