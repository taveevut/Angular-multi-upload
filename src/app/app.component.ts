import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  previews: any = [];

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    private http: HttpClient,
  ) { }


  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var numberOfFiles = event.target.files.length;
      for (let i = 0; i < numberOfFiles; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.previews.push(event.target.result);

          this.myForm.patchValue({
            fileSource: this.previews
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit() {
    console.log(this.myForm.value);
    this.http.post('http://localhost:8040/upload.php', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      });
  }
}
