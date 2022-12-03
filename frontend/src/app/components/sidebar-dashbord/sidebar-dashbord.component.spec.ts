import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDashbordComponent } from './sidebar-dashbord.component';

describe('SidebarDashbordComponent', () => {
  let component: SidebarDashbordComponent;
  let fixture: ComponentFixture<SidebarDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarDashbordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
