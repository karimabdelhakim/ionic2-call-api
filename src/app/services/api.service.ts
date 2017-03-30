import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class Api {
	http:any;
	baseUrl:string;
    token:string;
    email:string;
    password:string;
    device_model:string;
    device_token:string;
    app_version:string;

	constructor(http:Http) {
		this.http = http;
		this.baseUrl = "http://devx.paymeapp.co/api/v2"

	}

	getItems(token){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify({token:token});
		return this.http.post(this.baseUrl+"/mobile/home",body,options)
		.map(res => res.json())
			
	}

	login(body_obj){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(body_obj);
		return this.http.post(this.baseUrl+"/login",body,options)
		.map(res => res.json())
	}
}