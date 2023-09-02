import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResponseDto } from './common-model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  alertClass: String | undefined ;
  alertIconId:String | undefined ;
  showMsg : boolean=false;
  message: String | undefined ;
  alertTimer:any=null;
  private userRoles: any;
  adminRole: boolean = false;


  constructor(private http: HttpClient) { }

  public httpGet(url:any):Observable<ResponseDto>{
    return this.http.get<ResponseDto>(url);
  }
  public httpPost(url:any, reqData:any):Observable<ResponseDto>{
    return this.http.post<ResponseDto>(url,reqData);
  }
  public showMessage(message: String, isSuccess: boolean,isWarning?:boolean){
    this.message = message;
    this.showMsg = true;
    if(!isSuccess){
      this.alertClass = 'alert-danger';
      this.alertIconId = 'exclamation-triangle-fill';

    } else if(typeof isWarning !== undefined && isWarning){
      this.alertClass = 'alert-warning';
      this.alertIconId = 'info-fill';
    }
    else{
      this.alertClass = 'alert-success';
      this.alertIconId = 'check-circle-fill';
    }

    this.startMsgInterval()
    
  }
  startMsgInterval(){
    this.alertTimer = setTimeout(() => {
      this.showMsg =false
    }, 3500);
  }

  stopMsgInterval() {
    clearTimeout(this.alertTimer);
  }

  //generate 13 digits random number
  getRandom13DigitNumber() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const maxDigits = 24;
    let randomNum = '';
    
    for (let i = 0; i < maxDigits; i++) {
      const randomIndex  = Math.floor(Math.random() * characters.length); // Generate a random digit between 0 and 9
      randomNum += characters.charAt(randomIndex);
    }
  
    return randomNum;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('login') ? true:false;
  }

  setLoggedIn() {
    const random13DigitNum = this.getRandom13DigitNumber();
    sessionStorage.setItem('login', random13DigitNum);
  }

  setLoggedOut() {
    sessionStorage.removeItem('login');
  }

  setRoles(role:any){
    this.userRoles = role;
  }
  
  getRoles(){
    if (this.userRoles == 'admin') {
      this.adminRole = true;
    }
    if (this.userRoles == 'user') {
      this.adminRole = false;
    }
    return this.adminRole;
  }
}
