import { Event } from './event';

export interface Booking {
    id: number;
    name: string;
    events?: Event[];
}