import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenusComponent } from './menus.component';
import { Categorie } from '../../models/categorie';

describe('MenusComponent', () => {
  let component: MenusComponent;
  let fixture: ComponentFixture<MenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MenusComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Select a categorie categorie', () => {
    let categorie: Categorie = {
      name: '',
      items: []
    }
    component.onSelect(categorie);

    expect(component.selectedCategorie).toEqual(categorie);

  })
});
