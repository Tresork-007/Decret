import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretListComponent } from './decret-list.component';

describe('DecretListComponent', () => {
  let component: DecretListComponent;
  let fixture: ComponentFixture<DecretListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecretListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecretListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
