import {
    fakeAsync, async, tick, inject, TestBed
} from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {
    HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { BookingService } from './booking.service';
import { ApiService } from './api.service';

import { Booking, Event } from '../models';

describe('BookingService test suite', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                ApiService,
                BookingService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    }));

    it('can instantiate service when inject service',
        inject([BookingService], (service: BookingService) => {
            expect(service instanceof BookingService).toBe(true);
        })
    );

    it('can instantiate service when inject service',
        inject(
            [
                BookingService,
                ApiService,
                XHRBackend
            ],
            (
                service: BookingService,
                apiService: ApiService,
                mockBackend: MockBackend
            ) => {
                let mockResponseLength = mockResponse.data.length;
                expect(service instanceof BookingService).toBe(true);
                mockBackend.connections.subscribe( (connection: MockConnection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                service.getBookings().subscribe( (bookings: Booking[]) => {
                    expect(bookings.length)
                        .toEqual(mockResponseLength);
                });
        })
    );    

});


const mockApiService = {

    get(url: string): Promise<any> {
        return Promise.resolve(mockResponse);
    }

};

const mockResponse = {
    "data": [
        {
            "id": 0,
            "name": "booking1",
            "events": [
                {
                    "id": 0,
                    "name": "event1"
                }, {
                    "id": 1,
                    "name": "event2"
                }
            ]
        }, {
            "id": 1,
            "name": "booking2",
            "events": [
                {
                    "id": 2,
                    "name": "event3"
                }
            ]
        }, {
            "id": 2,
            "name": "booking3",
            "events": [
                {
                    "id": 3,
                    "name": "event4"
                }, {
                    "id": 4,
                    "name": "event5"
                }, {
                    "id": 5,
                    "name": "event6"
                }
            ]
        }, {
            "id": 3,
            "name": "booking4"
        }, {
            "id": 4,
            "name": "booking5",
            "events": [
                {
                    "id": 6,
                    "name": "event7"
                }, {
                    "id": 7,
                    "name": "event8"
                }
            ]
        }, {
            "id": 5,
            "name": "booking6"
        }
    ]
};
