import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-demo-capitalize-fisrt',
  templateUrl: './demo-capitalize-fisrt.component.html',
  styleUrl: './demo-capitalize-fisrt.component.css'
})
export class DemoCapitalizeFisrtComponent {
  private ser = inject(StudentService);

  test(){
    this.ser.testing().subscribe(
      (res: any) => {
        console.log("checking response..", res);
      },(error) => {
        console.log("checking error...", error);
      }
    )
  }

  testPost(email: any){
    console.log("email:", email);
    this.ser.checkPost(email).subscribe(
      (res: any) => {
        console.log("checking post response..", res);
      },(error) => {
        console.log("checking post error...", error);
      }
    )
  }

}
