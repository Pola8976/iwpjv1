import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSettingsComponent } from './seller-settings.component';

describe('SellerSettingsComponent', () => {
  let component: SellerSettingsComponent;
  let fixture: ComponentFixture<SellerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
