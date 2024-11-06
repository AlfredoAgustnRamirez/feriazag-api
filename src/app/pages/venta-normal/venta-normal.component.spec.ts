import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaNormalComponent } from './venta-normal.component';

describe('VentaComponent', () => {
  let component: VentaNormalComponent;
  let fixture: ComponentFixture<VentaNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaNormalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentaNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
