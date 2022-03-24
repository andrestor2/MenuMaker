import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { FileSaverService } from 'ngx-filesaver';
import { AppConstants } from '../../../constants/appConstants';

@Injectable({
  providedIn: 'root',
})
export class FileGenerationService {
  constructor(private fileSaverService: FileSaverService) { }

  public downloadFile(formatedText: string) {    

    if (formatedText) {
      //Process the information
      let menuBlob = this.generateBlob(formatedText);

      //Generate the file      
      const now = moment().format('YYYYMMDD_HHMMSS'); 
      const fileName = AppConstants.TEXT_FILE.concat(now.toString()).concat(AppConstants.MENU_FILE_EXTENSION);
      this.fileSaverService.save(menuBlob, fileName);
    }
  }

  private generateBlob(fullMenu: string) {
    //let textValue: string = JSON.stringify(fullMenu);
    let blobData = new Blob([fullMenu], {
      type: 'text/plain',
    });

    return blobData;
  }
}
