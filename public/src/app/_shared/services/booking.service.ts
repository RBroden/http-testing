import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

import { Booking, Event } from '../models';

import { Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookingService {

    private bookings: Booking[];
    private currentBookingId: number;
    private bookingList$: BehaviorSubject<Booking[]> = new BehaviorSubject(null);
    private currentBooking$: BehaviorSubject<Booking> = new BehaviorSubject(null);
    private errorMessage: string;
    private bookingApi: any = {
        Bookings: 'bookings'
    };

    constructor(private apiService: ApiService) {
        
        this.requestBookings()
            .then( (bookings) => {
                this.setBookings(bookings)
            });
    }

    requestBookings(): Promise<Booking[]>{
        return <Promise<Booking[]>>this.apiService.get(this.bookingApi.Bookings);
    }

    getBookings(): Observable<Booking[]>{
        return this.bookingList$.asObservable()
            .catch(this.handleError);
    }

    setBookings(bookings: Booking[]): void {
        this.bookings = bookings;
        this.bookingList$.next(this.bookings);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}