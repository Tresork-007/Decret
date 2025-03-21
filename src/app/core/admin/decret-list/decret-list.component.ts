import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Decret {
  id: string;
  title: string;
  type: string;
  reference: string;
  date: string;
  status: 'published' | 'draft' | 'archived';
  fileSize?: number;
  createdBy?: string;
  signature?: string;
}

@Component({
  selector: 'app-decret-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './decret-list.component.html',
  styleUrls: ['./decret-list.component.css']
})
export class DecretListComponent implements OnInit {
  decrets: Decret[] = [];
  filteredDecrets: Decret[] = [];
  searchTerm: string = '';
  selectedType: string = 'all';
  selectedStatus: string = 'all';
  selectedYear: string = 'all';
  years: string[] = [];
  isLoading: boolean = true;
  showFilters: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Simuler le chargement des données
    setTimeout(() => {
      this.loadDecrets();
      this.isLoading = false;
    }, 1500);
  }

  loadDecrets(): void {
    // Données simulées pour le développement
    this.decrets = [
      {
        id: 'dec-001',
        title: 'Décret relatif à la création du ministère des affaires étrangères',
        type: 'DECRET',
        reference: 'DEC-2025-001',
        date: '2025-03-15',
        status: 'published',
        fileSize: 1.2,
        createdBy: 'Admin',
        signature: 'assets/images/sample-signature.png'
      },
      {
        id: 'dec-002',
        title: 'Arrêté portant sur la réglementation des marchés publics',
        type: 'ARRETE',
        reference: 'ARR-2025-012',
        date: '2025-03-10',
        status: 'published',
        fileSize: 0.8,
        createdBy: 'Admin',
        signature: 'assets/images/sample-signature.png'
      },
      {
        id: 'dec-003',
        title: 'Décret portant organisation du ministère de la santé',
        type: 'DECRET',
        reference: 'DEC-2025-002',
        date: '2025-03-05',
        status: 'draft',
        fileSize: 2.1,
        createdBy: 'Admin'
      },
      {
        id: 'dec-004',
        title: 'Circulaire sur les procédures administratives',
        type: 'CIRCULAIRE',
        reference: 'CIR-2025-003',
        date: '2025-02-28',
        status: 'published',
        fileSize: 1.5,
        createdBy: 'Admin',
        signature: 'assets/images/sample-signature.png'
      },
      {
        id: 'dec-005',
        title: 'Décret fixant les critères d\'éligibilité aux subventions publiques',
        type: 'DECRET',
        reference: 'DEC-2025-003',
        date: '2025-02-20',
        status: 'archived',
        fileSize: 1.7,
        createdBy: 'Admin',
        signature: 'assets/images/sample-signature.png'
      },
      {
        id: 'dec-006',
        title: 'Arrêté relatif aux normes sanitaires des établissements publics',
        type: 'ARRETE',
        reference: 'ARR-2025-013',
        date: '2024-12-15',
        status: 'published',
        fileSize: 0.9,
        createdBy: 'Admin',
        signature: 'assets/images/sample-signature.png'
      }
    ];
    
    // Appliquer les filtres initiaux
    this.applyFilters();
    
    // Extraire les années uniques pour le filtre
    const uniqueYears = new Set<string>();
    this.decrets.forEach(decret => {
      const year = new Date(decret.date).getFullYear().toString();
      uniqueYears.add(year);
    });
    this.years = Array.from(uniqueYears).sort((a, b) => b.localeCompare(a)); // Tri décroissant
  }

  applyFilters(): void {
    this.filteredDecrets = this.decrets.filter(decret => {
      // Filtre par terme de recherche
      const matchesSearch = this.searchTerm ? 
        decret.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        decret.reference.toLowerCase().includes(this.searchTerm.toLowerCase()) :
        true;
      
      // Filtre par type
      const matchesType = this.selectedType === 'all' ? true : decret.type === this.selectedType;
      
      // Filtre par statut
      const matchesStatus = this.selectedStatus === 'all' ? true : decret.status === this.selectedStatus;
      
      // Filtre par année
      const matchesYear = this.selectedYear === 'all' ? 
        true : 
        new Date(decret.date).getFullYear().toString() === this.selectedYear;
      
      return matchesSearch && matchesType && matchesStatus && matchesYear;
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = 'all';
    this.selectedStatus = 'all';
    this.selectedYear = 'all';
    this.applyFilters();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }

  formatFileSize(size: number | undefined): string {
    return size ? size.toFixed(2) + ' Mo' : 'N/A';
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'published': return 'status-success';
      case 'draft': return 'status-pending';
      case 'archived': return 'status-muted';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'published': return 'Publié';
      case 'draft': return 'Brouillon';
      case 'archived': return 'Archivé';
      default: return status;
    }
  }
}
