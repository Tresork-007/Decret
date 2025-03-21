import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-digital-signature',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './digital-signature.component.html',
  styleUrls: ['./digital-signature.component.css']
})
export class DigitalSignatureComponent implements OnInit, AfterViewInit {
  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  signatureForm: FormGroup;
  ctx!: CanvasRenderingContext2D;
  isDrawing = false;
  isEmpty = true;

  constructor(private fb: FormBuilder) {
    this.signatureForm = this.fb.group({
      signatureName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Initialisation
  }

  ngAfterViewInit(): void {
    const canvas = this.signatureCanvas.nativeElement;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';

    // Ajuster la taille du canvas pour qu'il soit responsive
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));

    // Événements pour le dessin
    canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));
    canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

    // Support tactile
    canvas.addEventListener('touchstart', this.startDrawingTouch.bind(this));
    canvas.addEventListener('touchmove', this.drawTouch.bind(this));
    canvas.addEventListener('touchend', this.stopDrawing.bind(this));
  }

  resizeCanvas(): void {
    const canvas = this.signatureCanvas.nativeElement;
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      this.clearCanvas(); // Réinitialiser le canvas après le redimensionnement
    }
  }

  startDrawing(event: MouseEvent): void {
    this.isDrawing = true;
    this.isEmpty = false;
    const { offsetX, offsetY } = event;
    this.ctx.beginPath();
    this.ctx.moveTo(offsetX, offsetY);
  }

  startDrawingTouch(event: TouchEvent): void {
    event.preventDefault();
    this.isDrawing = true;
    this.isEmpty = false;
    const touch = event.touches[0];
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    this.ctx.beginPath();
    this.ctx.moveTo(offsetX, offsetY);
  }

  draw(event: MouseEvent): void {
    if (!this.isDrawing) return;
    const { offsetX, offsetY } = event;
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
  }

  drawTouch(event: TouchEvent): void {
    event.preventDefault();
    if (!this.isDrawing) return;
    const touch = event.touches[0];
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
    this.ctx.closePath();
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.signatureCanvas.nativeElement.width, this.signatureCanvas.nativeElement.height);
    this.isEmpty = true;
  }

  saveSignature(): void {
    if (this.isEmpty || this.signatureForm.invalid) {
      alert('Veuillez dessiner une signature et entrer un nom valide');
      return;
    }

    const signatureData = this.signatureCanvas.nativeElement.toDataURL('image/png');
    const signatureName = this.signatureForm.get('signatureName')?.value;
    
    // Simulation d'enregistrement
    console.log('Signature enregistrée:', { name: signatureName, data: signatureData });
    
    // En cas de succès, réinitialiser
    this.clearCanvas();
    this.signatureForm.reset();
    alert('Signature enregistrée avec succès !');
  }
}
