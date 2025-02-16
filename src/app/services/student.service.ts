import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  constructor() { }

  testing(){
    return this.http.get('http://192.168.1.199:2222/company/userProfile');
  }

  checkPost(data: any){
    let params = new HttpParams().set('email', data);
    return this.http.post('http://192.168.1.199:2222/company/Mailgenerateotp', {}, {params});
  }
  
}
