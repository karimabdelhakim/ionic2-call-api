import { Component} from '@angular/core';

import { NavController } from 'ionic-angular';
import { Api } from '../../app/services/api.service';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Page2 } from '../page2/page2';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
})
export class Page1 {
	

	products: any;
	merchants: any;
	type: string;
	items:any;
	token:string;

  constructor(public navCtrl: NavController,public storage: Storage,private apiService:Api,
  	private alertCtrl: AlertController) {

    this.type = "merchants"
  }

  presentAlert(title,message) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}

  ngOnInit(){
  
  	 this.storage.ready().then(() => {
       this.storage.get('token').then((val) => {
         
         if(val){
         	this.token = val;
         	this.getItems(this.token);
         }
         else{
         	this.token=null;
        	this.navCtrl.setRoot(Page2);
         }
       })  
     });

	
  }

	getItems(token){
		console.log("in get items func");
		this.apiService.getItems(token).subscribe(response => {
			this.items = response;
			console.log("in get items func");
		this.merchants = this.items["merchants"];
		this.products = this.items["products"];
		})
		
	}



}
