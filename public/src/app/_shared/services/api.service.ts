import { Injectable } from '@angular/core';
import {
    Http,
    Headers,
    Response,
    RequestOptions
} from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Booking, Event } from '../models';

@Injectable()
export class ApiService {

    private apiUrl = 'api/';
    private bookingUrl = this.apiUrl + '/booking';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers});

    constructor(private http: Http) { }

    get (url: string): Promise<any> {
        return this.http.get(this.apiUrl + url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData (res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError ( error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`; 
        }
        else {
            errMsg = error.message ? error.message: error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}