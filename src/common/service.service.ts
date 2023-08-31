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

  isLoggedIn(): boolean {
    return sessionStorage.getItem('login') ? true:false;
  }

  setLoggedIn() {
    sessionStorage.setItem('login', 'true');
  }

  setLoggedOut() {
    sessionStorage.removeItem('login');
  }


}
