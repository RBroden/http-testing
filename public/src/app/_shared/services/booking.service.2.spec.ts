import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { BookingService } from './booking.service';
import { ApiService } from './api.service';

import { Booking, Event } from '../models';

describe('ApiService test suite', () => {

    beforeEach(() => {
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            ApiService,
            BookingService
        ]);
        //this.apiService = this.injector.get(ApiService) as ApiService;
        this.bookingService = this.injector.get(BookingService) as BookingService;
        this.backend = this.injector.get(ConnectionBackend) as MockBackend;
        this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
    });

    // use fit() instead of it() to focus on those tests
    // it('2 get should query current service url', () => {
    //     this.apiService.get('bookings');
    //     expect(this.lastConnection).toBeDefined();
    //     expect(this.lastConnection.request.url).toMatch(/api\/bookings$/);
    // });

    // it('2 get(`bookings`) should return some bookings', fakeAsync(() => {
    //     let result: Booking[];
    //     let mockResponseLength = mockResponse.data.length;
    //     this.apiService.get('bookings')
    //         .then( (bookings: Booking[]) => result = bookings);
    //     this.lastConnection.mockRespond(new Response(new ResponseOptions({
    //         body: JSON.stringify(mockResponse)
    //     })));
    //     tick();
    //     expect(result.length).toEqual(mockResponseLength);
    //     for(let i=0; i < mockResponseLength; ++i) {
    //         expect(result[i]).toEqual(mockResponse.data[i]);
    //     }
    // }));

    it('2zzzzz get(`bookings`) should return some bookings', fakeAsync(() => {
        let result: Booking[];
        let mockResponseLength = mockResponse.data.length;
        this.bookingService.requestBookings()
            .then( (bookings: Booking[]) => result = bookings);
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
        })));
        tick();
        expect(result.length).toEqual(mockResponseLength);
        for(let i=0; i < mockResponseLength; ++i) {
            expect(result[i]).toEqual(mockResponse.data[i]);
        }
        this.bookingService.setBookings(result);
        expect(this.bookingService.bookings.length)
            .toEqual(mockResponseLength);
    }));

    // xit('2 getHeroes() while server is down', fakeAsync(() => {
    //     let result: Booking[];
    //     let catchedError: any;
    //     this.apiService.get('bookings')
    //         .then( (bookings: Booking[]) => result = bookings)
    //         .catch( (error: any) => catchedError = error);
    //     this.lastConnection.mockRespond(new Response(new ResponseOptions({
    //         status: 404,
    //         statusText: 'URL not Found',
    //     })));
    //     tick();
    //     expect(result).toBeUndefined();
    //     expect(catchedError).toBeDefined();
    //  }));

});

const mockResponse = {
    "data": [
        {
            "id": 0,
            "name": "booking1",
            "events": [
                {
                    "id": 0,
                    "name": "event1"
                },{
                    "id": 1,
                    "name": "event2"
                }
            ]
        },{
            "id": 1,
            "name": "booking2",
            "events": [
                {
                    "id": 2,
                    "name": "event3"
                }
            ]
        },{
            "id": 2,
            "name": "booking3",
            "events": [
                {
                    "id": 3,
                    "name": "event4"
                },{
                    "id": 4,
                    "name": "event5"
                },{
                    "id": 5,
                    "name": "event6"
                }
            ]
        },{
            "id": 3,
            "name": "booking4"
        },{
            "id": 4,
            "name": "booking5",
            "events": [
                {
                    "id": 6,
                    "name": "event7"
                },{
                    "id": 7,
                    "name": "event8"
                }
            ]
        },{
            "id": 5,
            "name": "booking6"
        }
    ]
};
