import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretImportComponent } from './decret-import.component';

describe('DecretImportComponent', () => {
  let component: DecretImportComponent;
  let fixture: ComponentFixture<DecretImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecretImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
