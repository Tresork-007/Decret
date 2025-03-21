import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Decret {
  id: string;
  number: string;
  content: string;
  date: string;
  fileUrl?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule], //FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  decret: Decret | null = null;
  isLoading: boolean = true;
  isSidebarOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Simuler le chargement des données
    setTimeout(() => {
      // Simuler les données utilisateur
      this.user = {
        id: '123',
        name: 'Jean Dupont',
        email: 'jean.dupont@exemple.com',
        avatar: 'assets/images/default-avatar.png'
      };

      // Simuler un décret
      this.decret = {
        id: '456',
        number: '2023-01-125',
        content: 'Décret portant sur la régulation des activités économiques dans le secteur forestier en République Gabonaise. Ce décret établit les procédures et règles applicables pour l\'exploitation forestière durable, conformément aux accords internationaux sur la protection de l\'environnement. Les entreprises opérant dans ce secteur doivent soumettre un plan de gestion durable et s\'engager à respecter les quotas d\'exploitation définis par le ministère concerné.',
        date: '15 janvier 2023',
        fileUrl: '#'
      };

      this.isLoading = false;
    }, 1500);

    // Animation des éléments de la sidebar
    setTimeout(() => {
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach((item, index) => {
        setTimeout(() => {
          (item as HTMLElement).style.opacity = '1';
          (item as HTMLElement).style.transform = 'translateX(0)';
        }, 100 * index);
      });
    }, 300);
  }

  /**
   * Ouvre ou ferme la sidebar en version mobile
   */
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    
    // Ajouter ou supprimer la classe 'active' du backdrop
    const backdrop = document.querySelector('.sidebar-backdrop');
    if (backdrop) {
      if (this.isSidebarOpen) {
        backdrop.classList.add('active');
      } else {
        backdrop.classList.remove('active');
      }
    }
  }

  /**
   * Gère les erreurs de chargement d'image
   */
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/default-avatar.png';
  }

  /**
   * Affiche le décret en plein écran ou dans une nouvelle fenêtre
   */
  viewDecret(decret: Decret): void {
    // Code pour afficher le décret en plein écran
    console.log('Affichage du décret:', decret.id);
    alert('Fonctionnalité à implémenter : Affichage du décret ' + decret.number);
  }

  /**
   * Télécharge le décret
   */
  downloadDecret(decret: Decret): void {
    // Code pour télécharger le décret
    console.log('Téléchargement du décret:', decret.id);
    
    if (decret.fileUrl) {
      // Simulation de téléchargement
      alert('Fonctionnalité à implémenter : Téléchargement du décret ' + decret.number);
      
      // Dans une implémentation réelle, on utiliserait:
      // window.open(decret.fileUrl, '_blank');
      // ou
      // const link = document.createElement('a');
      // link.href = decret.fileUrl;
      // link.download = `Decret_${decret.number}.pdf`;
      // link.click();
    }
  }
}
