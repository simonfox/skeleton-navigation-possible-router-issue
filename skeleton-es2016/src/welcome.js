import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Welcome {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  open() {
    this.eventAggregator.publish("OPEN");
  }
}

