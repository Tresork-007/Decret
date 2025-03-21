import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Decret } from '../models/decret.model';

@Injectable({
  providedIn: 'root'
})
export class DecretService {
  private apiUrl = 'http://localhost:3000/api'; // URL API par défaut

  constructor(private http: HttpClient) { }

  // Récupérer le décret de l'utilisateur connecté
  getUserDecret(): Observable<Decret> {
    // Pour le développement, on retourne une donnée mockée
    // TODO: Remplacer par l'appel API réel au backend
    const mockDecret: Decret = {
      id: '123456',
      title: 'Décret de Nomination',
      description: 'Décret de nomination au poste de Directeur Général des Services de l\'État',
      dateCreation: new Date(),
      fileUrl: '/assets/documents/decret.pdf',
      userId: 'user123'
    };
    
    return of(mockDecret);
    // Décommenter la ligne suivante pour l'appel API réel
    // return this.http.get<Decret>(`${this.apiUrl}/decrets/user`);
  }

  // Récupérer un décret spécifique par son ID
  getDecretById(id: string): Observable<Decret> {
    // Pour le développement, on retourne une donnée mockée
    // TODO: Remplacer par l'appel API réel au backend
    const mockDecret: Decret = {
      id: id,
      title: 'Décret de Nomination',
      description: 'Décret de nomination au poste de Directeur Général des Services de l\'État',
      dateCreation: new Date(),
      fileUrl: '/assets/documents/decret.pdf',
      userId: 'user123'
    };
    
    return of(mockDecret);
    // Décommenter la ligne suivante pour l'appel API réel
    // return this.http.get<Decret>(`${this.apiUrl}/decrets/${id}`);
  }

  // Télécharger le fichier de décret
  downloadDecret(decretId: string): Observable<Blob> {
    // Pour le développement, on simule un téléchargement d'un PDF vide
    // TODO: Remplacer par l'appel API réel au backend
    const emptyPdf = new Blob(['%PDF-1.0\n1 0 obj\n<</Type/Catalog/Pages 2 0 R>>\nendobj\n2 0 obj\n<</Type/Pages/Kids[3 0 R]/Count 1>>\nendobj\n3 0 obj\n<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Resources<<>>/Contents 4 0 R>>\nendobj\n4 0 obj\n<</Length 10>>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Décret de nomination) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000015 00000 n\n0000000061 00000 n\n0000000114 00000 n\n0000000211 00000 n\ntrailer\n<</Size 5/Root 1 0 R>>\nstartxref\n300\n%%EOF'], { type: 'application/pdf' });
    
    return of(emptyPdf);
    // Décommenter la ligne suivante pour l'appel API réel
    // return this.http.get(`${this.apiUrl}/decrets/${decretId}/download`, {
    //   responseType: 'blob'
    // });
  }

  // Obtenir l'URL pour prévisualiser un PDF de décret
  getDecretPdfUrl(decretId: string): string {
    // Pour le développement, on utilise un fichier statique
    // TODO: Remplacer par l'URL réelle de l'API backend
    return '/assets/documents/decret.pdf';
    // Décommenter la ligne suivante pour l'URL API réelle
    // return `${this.apiUrl}/decrets/${decretId}/view`;
  }

  // Obtenir l'URL pour visualiser un décret dans l'application
  getDecretViewUrl(decretId: string): string {
    return `/decret/${decretId}`;
  }
}
