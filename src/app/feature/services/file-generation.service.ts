import { Injectable } from '@angular/core';

import { FileSaverService } from 'ngx-filesaver';
import { AppConstants } from '../../constants/appConstants';

@Injectable({
  providedIn: 'root',
})
export class FileGenerationService {
  constructor(private fileSAverService: FileSaverService) { }

  public downloadFile() {
    //Get info from localStorage
    let menuText = sessionStorage.getItem(AppConstants.MENU_DATA);

    if (menuText) {
      //Process the information
      let menuBlob = this.generateBlob(menuText);

      //Generate the file
      this.fileSAverService.save(menuBlob, AppConstants.TEXT_FILE);
    } else {
    }
  }

  private generateBlob(fullMenu: string) {
    let textValue: string = JSON.stringify(fullMenu);
    let blobData = new Blob([textValue], {
      type: 'text/plain',
    });

    return blobData;
  }
}
