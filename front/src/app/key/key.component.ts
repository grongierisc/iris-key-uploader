import { Component, OnInit } from '@angular/core';
import { IrisKeyService } from '../service/iris-key.service'
import { Key } from './key';

import { MatDialog} from '@angular/material/dialog';
import { UploaderComponent } from '../uploader/uploader.component';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  key: Key = {
    infoKey: '',
    summary: ''
  };
  constructor(
    private _dialog: MatDialog, 
    private _snackBar: MatSnackBar,
    private keyService: IrisKeyService,
  ) { }

  ngOnInit(): void {
    this.keyService.info().subscribe( key => {this.key = key},error => {
      
      console.log("There was an error importing file", error);

      this._snackBar.open("Failed : "+error.message,'Close');

  })
  }

  openUploadKey(): void {
    const dialogRef = this._dialog.open(UploaderComponent, {
      panelClass: 'modal-panel',
      width: '700px',
      data: {
        
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.keyService.info().subscribe( key => {this.key = key})
      }
    });
  }
}
