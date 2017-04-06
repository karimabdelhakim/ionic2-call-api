import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { NavController, NavParams ,Platform,AlertController} from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { Page1 } from '../page1/page1';

import { Api } from '../../app/services/api.service';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  platform_name:string;
  app_version:any;
  model:any;
  device_token:string;
  code:number;
  resp:Object;
  message:string;
  auth_user:Object;
  token:string;     

  constructor(public plt: Platform, public navCtrl: NavController, public navParams: NavParams,
    private appVersion: AppVersion,private device: Device,private apiService:Api,public storage: Storage,
    private alertCtrl: AlertController) {

    if(this.plt.is('ios')){
      this.platform_name="ios";
    }
    else if(this.plt.is('android')){
      this.platform_name="Android"
    }
    else{this.platform_name =null}

    this.appVersion.getVersionNumber().then((vers)=>{
        this.app_version = vers;
    })
    this.model = this.device.model
    this.device_token = "a65s4d"

  }



presentAlert(title,message) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}

  user = {};
  loginForm() {
    
    this.user["device_platform"] = this.platform_name;
    this.user["app_version"] = this.app_version;
    this.user["device_token"] = this.device_token;
    this.user["device_model"] = this.model;
   
    this.apiService.login(this.user).subscribe(response => {

      this.resp = response;
      this.code = this.resp["Rcode"];
      this.message = this.resp["Message"];
      if(this.code==200 || this.code==201){
        //this.presentAlert("login success","code: "+this.code+" msg: "+this.message);
        
        this.auth_user = this.resp["User"];
        this.token = this.auth_user["token"];
      
        this.storage.ready().then(() => {
         this.storage.set('token', this.token);
         this.storage.get('token').then((val) => {
           if(!val){
             this.presentAlert("error","problem in storage");
           }
           else{
             this.navCtrl.setRoot(Page1);
           }
         })
        });
           
        //
      }
      else if(this.code==1){
        this.presentAlert("error code "+this.code, "msg: "+this.message);

        this.storage.ready().then(() => {
        this.storage.remove('token');
         });        
      }
      else{
        this.presentAlert("error","the server is not available"); 
      }
      
    })
    
  
          
  }
  
  }


