import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { EventDTO } from '@dto/eventDTO';
import { EventService } from '../event.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormatData } from 'app/shared/utils/format-data';
import { FilterEventDTO } from '@dto/filterEventDTO';

@Component({
  selector: 'app-home',
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [EventService]
})
export class HomeComponent implements OnInit, OnDestroy {
  public events: EventDTO[] = [];
  public filter: FormGroup;
  private page: number = 0;
  public format: FormatData = new FormatData();
  private pastFilter: FilterEventDTO = FilterEventDTO.getFilter();
  public showFilter: boolean = false;

  constructor (private service: EventService, private builder: FormBuilder) {
    this.filter = builder.group({
      startDate: [this.pastFilter.startDate, []],
      type: [this.pastFilter.type, []],
      gender: [this.pastFilter.gender, []],
      typeParticipant: [this.pastFilter.typeParticipant, []],
      sport: [this.pastFilter.sport, []]
    });
  }

  ngOnInit(): void {
    this.refreshEvents();
    window.addEventListener('scroll', this.handleScroll, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  private handleScroll = (): void => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 10) {
      this.page++;
      this.refreshEvents();
    }
  };

  public refreshEvents(): void {
    this.service.getFilteredEvents(FilterEventDTO.fromJSON(this.filter.value), this.page).subscribe({
      next: (response: EventDTO[]) => {
        this.events = [...this.events, ...response];
      }
    });
  }

  public filterEvents(): void {
    FilterEventDTO.setFilter(FilterEventDTO.fromJSON(this.filter.value));
    this.page = 0;
    this.events = [];
    this.refreshEvents();
  }

  public changeVisibilityOfFilter(): void {
    this.showFilter = !this.showFilter;
  }

  public join(eventId: string) {
    this.service.joinEvent("", eventId).subscribe({
      next: (response) => {
        window.location.reload();
      }
    })
  }
}
