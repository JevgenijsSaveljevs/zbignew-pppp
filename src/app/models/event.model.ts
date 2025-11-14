export interface Event {
  id?: number;
  eventType: EventType;
  dateTime?: string;
}

export type EventType = 'POOPOO_OUTSIDE' | 'POOPOO_INSIDE' | 'PEEPEE_OUTSIDE' | 'PEEPEE_INSIDE';

export const EVENT_TYPES: EventType[] = [
  'POOPOO_OUTSIDE',
  'POOPOO_INSIDE',
  'PEEPEE_OUTSIDE',
  'PEEPEE_INSIDE'
];

export interface SearchParams {
  eventType?: EventType;
  since?: string;
  limit?: number;
}

export interface DateTimeSearchParams {
  eventType?: EventType;
  startTime: string;
  endTime: string;
  limit?: number;
}
