import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { DecretService } from '../../services/decret.service';
import { Decret } from '../../models/decret.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-decret-view',
  templateUrl: './decret-view.component.html',
  styleUrls: ['./decret-view.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, FooterComponent]
})
export class DecretViewComponent implements OnInit, AfterViewInit {
  @ViewChild('pdfContainer') pdfContainer!: ElementRef;
  
  decretId: string = '';
  decret: Decret | null = null;
  loading: boolean = true;
  error: string | null = null;
  pdfUrl: string = '';
  safeFileUrl: SafeResourceUrl | null = null;
  pdfLoaded: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private decretService: DecretService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.decretId = params['id'];
      this.loadDecret();
    });
  }

  ngAfterViewInit(): void {
    // Ce code sera exécuté après l'initialisation de la vue
    if (this.pdfUrl) {
      this.displayPdf();
    }
  }

  loadDecret(): void {
    this.loading = true;
    
    this.decretService.getDecretById(this.decretId).subscribe({
      next: (decret) => {
        this.decret = decret;
        this.loading = false;
        this.pdfUrl = this.decretService.getDecretPdfUrl(this.decretId);
        
        if (decret && decret.fileUrl) {
          this.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(decret.fileUrl);
        }
        
        // Si la vue est déjà initialisée, afficher le PDF
        if (this.pdfContainer) {
          setTimeout(() => this.displayPdf(), 0);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur lors du chargement du décret:', err);
        this.error = 'Impossible de charger le décret. Veuillez réessayer plus tard.';
        this.loading = false;
      }
    });
  }

  displayPdf(): void {
    if (this.pdfUrl && this.pdfContainer) {
      const iframe = document.createElement('iframe');
      iframe.src = this.pdfUrl;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = 'none';
      iframe.className = 'pdf-viewer';
      
      // Vider le conteneur et ajouter l'iframe
      this.pdfContainer.nativeElement.innerHTML = '';
      this.pdfContainer.nativeElement.appendChild(iframe);
    }
  }

  downloadDecret(): void {
    if (this.decretId) {
      this.decretService.downloadDecret(this.decretId).subscribe({
        next: (blob) => {
          // Créer un URL pour le blob et déclencher le téléchargement
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${this.decret?.title || 'decret'}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        },
        error: (err) => {
          console.error('Erreur lors du téléchargement du décret:', err);
          alert('Impossible de télécharger le décret. Veuillez réessayer plus tard.');
        }
      });
    }
  }

  onPdfLoaded(): void {
    this.pdfLoaded = true;
  }
}
