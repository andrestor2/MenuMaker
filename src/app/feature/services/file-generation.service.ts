import { Injectable } from '@angular/core';

import { FileSaverService } from 'ngx-filesaver';
import { AppConstants } from '../../constants/appConstants';

@Injectable({
  providedIn: 'root',
})
export class FileGenerationService {
  constructor(private fileSAverService: FileSaverService) { }

  public downloadFile(formatedText: string) {    

    if (formatedText) {
      //Process the information
      let menuBlob = this.generateBlob(formatedText);

      //Generate the file
      this.fileSAverService.save(menuBlob, AppConstants.TEXT_FILE);
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
