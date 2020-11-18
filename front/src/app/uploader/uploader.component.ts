import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { IrisKeyService } from '../service/iris-key.service'
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  title = 'Key Uploader';
  form: FormGroup;
  submitted = false;
  file: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploaderComponent>,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private keyService: IrisKeyService,
  ) {
    this.form = this.fb.group({

      file: [null],

    })
  }

  ngOnInit() { }

  onDrop(event){
    this.uploadFile(event[0])
  }

  fromBrowser(event){
    this.uploadFile(event.target.files[0])
  }

  uploadFile(file) {
    this.form.patchValue({
      file: file
    });
    this.form.get('file').updateValueAndValidity()
    this.file = file
    var reader = new FileReader();
    var SLICE = 1024 * 1;
    var blob = file.slice(0, file.size < SLICE ? file.size : SLICE );
    reader.onload = (e) => {
      var input: HTMLInputElement = <HTMLInputElement>document.getElementById('filePreview')
      input.value = reader.result.toString();
    }
    reader.readAsText(blob);
  }

  reset() {
    this.submitted = false;
    this.form.reset();
    this.file = null;
  }

  /**
   * Delete file 
  */
  deleteFile() {
    this.file = null;
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  submitForm() {

    this.submitted = true;

    
      if (this.file == null){
        let that = this;
        this._snackBar.open("File is mandatory",'Close', {
          duration: 5000
        });
        return;
      }
    if (this.form.invalid) {
      return;
    }

    var formData: any = new FormData();
    formData.append("file", this.form.get('file').value)

    this.file = this.form.get('file').value
    this.keyService.import(formData).subscribe((data: any) => {
      this._snackBar.open(data.message, 'Done')
      .onAction()


      this.reset()
      this.dialogRef.close()

  }, error => {
      
      console.log("There was an error importing file", error);

      this._snackBar.open("Failed : "+error.error.summary,'Close');

  })
  }

    // Open a window with the given URL
    window_open(url: any) {
      var winReference = window.open();
      winReference.location = url;
      winReference.parent.focus();
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

}

