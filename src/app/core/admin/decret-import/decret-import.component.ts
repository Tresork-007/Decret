import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

interface ImportStatus {
  status: 'pending' | 'processing' | 'success' | 'error';
  message: string;
  progress: number;
  fileName?: string;
  fileSize?: number;
}

@Component({
  selector: 'app-decret-import',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './decret-import.component.html',
  styleUrls: ['./decret-import.component.css']
})
export class DecretImportComponent implements OnInit {
  importForm: FormGroup;
  fileToUpload: File | null = null;
  dragOver = false;
  importHistory: any[] = [];
  importStatus: ImportStatus | null = null;

  constructor(private fb: FormBuilder) {
    this.importForm = this.fb.group({
      documentType: ['DECRET', Validators.required],
      documentDate: ['', Validators.required],
      documentDescription: ['', [Validators.required, Validators.minLength(10)]],
      documentFile: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Simulation de l'historique d'importation
    this.importHistory = [
      {
        id: 'imp-001',
        fileName: 'decret-2025-001.pdf',
        fileSize: 1.2,
        date: '2025-03-15',
        status: 'success',
        type: 'DECRET'
      },
      {
        id: 'imp-002',
        fileName: 'decret-2025-002.pdf',
        fileSize: 0.8,
        date: '2025-03-10',
        status: 'success',
        type: 'ARRETE'
      },
      {
        id: 'imp-003',
        fileName: 'decret-2025-003.pdf',
        fileSize: 2.1,
        date: '2025-03-05',
        status: 'error',
        type: 'DECRET',
        errorMessage: 'Format de fichier non valide'
      }
    ];
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFileInput(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.handleFileInput(element.files);
    }
  }

  handleFileInput(files: FileList): void {
    const file = files[0];
    // Vérification du type de fichier (PDF uniquement)
    if (file.type !== 'application/pdf') {
      alert('Seuls les fichiers PDF sont acceptés.');
      return;
    }
    
    this.fileToUpload = file;
    this.importForm.patchValue({
      documentFile: file
    });
  }

  removeFile(): void {
    this.fileToUpload = null;
    this.importForm.patchValue({
      documentFile: null
    });
  }

  onSubmit(): void {
    if (this.importForm.invalid || !this.fileToUpload) {
      this.importForm.markAllAsTouched();
      return;
    }

    // Simulation du processus d'importation
    this.importStatus = {
      status: 'processing',
      message: 'Importation en cours...',
      progress: 0,
      fileName: this.fileToUpload.name,
      fileSize: this.fileToUpload.size / (1024 * 1024) // Convertir en Mo
    };

    // Simulation d'une barre de progression
    const interval = setInterval(() => {
      if (this.importStatus) {
        this.importStatus.progress += 10;
        
        if (this.importStatus.progress >= 100) {
          clearInterval(interval);
          this.importStatus.status = 'success';
          this.importStatus.message = 'Importation réussie !';
          
          // Ajouter à l'historique
          this.importHistory.unshift({
            id: `imp-${Math.floor(Math.random() * 1000)}`,
            fileName: this.fileToUpload?.name,
            fileSize: (this.fileToUpload?.size || 0) / (1024 * 1024),
            date: new Date().toISOString().split('T')[0],
            status: 'success',
            type: this.importForm.get('documentType')?.value
          });
          
          // Réinitialiser le formulaire après 2 secondes
          setTimeout(() => {
            this.importStatus = null;
            this.importForm.reset({
              documentType: 'DECRET'
            });
            this.fileToUpload = null;
          }, 2000);
        }
      }
    }, 300);
  }

  formatFileSize(size: number): string {
    return size.toFixed(2) + ' Mo';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }
}
