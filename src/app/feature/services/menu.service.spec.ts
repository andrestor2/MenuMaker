import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { MOCK_CATEGORIES } from 'src/assets/mock-menu';
import { Categorie } from 'src/app/models/categorie';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MenuService);
  });

  it('Process a large menu', () => {
    let menu = MOCK_CATEGORIES;
    
    let fullMenu: Categorie[] = service.getGeneralData(menu);

    expect(fullMenu.length).toEqual(menu.length);
  });
});
