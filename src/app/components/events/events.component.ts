import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { EventsService } from '../../services/events.service';
import { Event, EventType, EVENT_TYPES, SearchParams, DateTimeSearchParams } from '../../models/event.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  
  eventTypes: EventType[] = EVENT_TYPES;
  
  // Create Event Form
  newEvent: Event = {
    eventType: 'POOPOO_OUTSIDE'
  };

  // Simple Search Form
  searchParams: SearchParams = {};
  searchSinceOptions = [
    { label: '1 Hour', value: '1h' },
    { label: '24 Hours', value: '24h' },
    { label: '1 Week', value: '168h' },
    { label: '1 Month', value: '720h' }
  ];

  // DateTime Search Form
  dateTimeParams: DateTimeSearchParams = {
    startTime: '',
    endTime: ''
  };
  startDate: Date | null = null;
  endDate: Date | null = null;

  // Results
  searchResults: any[] = [];
  displayedColumns: string[] = ['id', 'eventType', 'dateTime'];
  selectedTabIndex = 0;

  constructor(
    private eventsService: EventsService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  createEvent() {
    this.eventsService.createEvent({...this.newEvent, dateTime: new Date().toISOString()}).subscribe({
      next: (event) => {
        this.snackBar.open('Event created successfully!', 'Close', { duration: 3000 });
        this.newEvent = { eventType: 'POOPOO_OUTSIDE' };
      },
      error: (error) => {
        this.snackBar.open('Error creating event: ' + error.message, 'Close', { duration: 3000 });
      }
    });
  }

  searchSimple() {
    this.eventsService.searchEvents(this.searchParams).subscribe({
      next: (results) => {
        this.searchResults = results.events || [];
        this.snackBar.open(`Found ${this.searchResults.length} events`, 'Close', { duration: 3000 });
        this.navigateToResultsTab();
      },
      error: (error) => {
        this.snackBar.open('Error searching events: ' + error.message, 'Close', { duration: 3000 });
      }
    });
  }

  searchByDateTime() {
    if (this.startDate && this.endDate) {
      this.dateTimeParams.startTime = this.startDate.toISOString();
      this.dateTimeParams.endTime = this.endDate.toISOString();

      this.eventsService.searchEventsByDateTime(this.dateTimeParams).subscribe({
        next: (results) => {
          this.searchResults = results.events || [];
          this.snackBar.open(`Found ${this.searchResults.length} events`, 'Close', { duration: 3000 });
          this.navigateToResultsTab();
        },
        error: (error) => {
          this.snackBar.open('Error searching events: ' + error.message, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please select both start and end dates', 'Close', { duration: 3000 });
    }
  }

  clearResults() {
    this.searchResults = [];
  }

  private navigateToResultsTab() {
    setTimeout(() => {
      // Switch to Results tab (index 3)
      this.selectedTabIndex = 3;
      this.cdr.detectChanges();
    }, 100);
  }
}
