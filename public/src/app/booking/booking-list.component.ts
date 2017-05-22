import { Component, OnInit } from '@angular/core';

import { BookingService } from '../_shared/services';
import { Booking, Event } from '../_shared/models';

@Component({
    selector: 'booking-list',
    template: `
        <div>
            Booking List
            <div *ngFor="let booking of bookingList">
                {{ booking.name }}
            </div>
        </div>
    `
})
export class BookingListComponent implements OnInit {

    bookingList: Booking[] = [];
    errorMessage: string;

    constructor(private bookingService: BookingService) { }

    ngOnInit() {
        this.bookingService.getBookings()
            .subscribe(
                bookings => this.setBookings(bookings),
                error => this.errorMessage = <any>error
            );
    }

    private setBookings(bookings: Booking[]): void{
        this.bookingList = bookings;
    }

}