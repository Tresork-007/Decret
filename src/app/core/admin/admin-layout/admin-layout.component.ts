import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  user: User | null = null;
  isSidebarOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Simuler les données utilisateur
    this.user = {
      id: '123',
      name: 'Utilisateur',
      email: 'utilisateur@gmail.com',
      avatar: 'assets/images/default-avatar.png'
    };
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default-avatar.png';
  }
}
