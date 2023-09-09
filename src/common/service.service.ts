import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from './common-model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  roles: any;
  constructor(private http: HttpClient) {}

  public httpGet(url: any): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(url);
  }

  public httpPost(url: any, reqData: any): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(url, reqData);
  }

  getRandom13DigitNumber() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()/';
    const maxDigits = 35;
    let randomNum = '';
    for (let i = 0; i < maxDigits; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomNum += characters.charAt(randomIndex);
    }
    return randomNum;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('login') ? true : false;
  }

  setLoggedIn() {
    const random13DigitNum = this.getRandom13DigitNumber();
    sessionStorage.setItem('login', random13DigitNum);
  }

  setLoggedOut() {
    sessionStorage.removeItem('login');
  }

  setRole(role:any){
    sessionStorage.setItem('role', role);
  }
  getRole(){
   
    return sessionStorage.getItem('role');
  }
  removeRole(){
    sessionStorage.removeItem('role');
  }

  setName(name:any){
    sessionStorage.setItem('name',name);
  }
  getName(){
    const name = sessionStorage.getItem('name');
    return name;
  }
  removeName(){
    sessionStorage.removeItem('name');
  }

  hasAdmin():boolean{
    if(this.getRole()=='admin'){
      return true;
    }
    if(this.getRole()=='user'){
      return false
    }
    return true;
  }
}
