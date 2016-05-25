import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class TopLevel {
	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;
	}

	configureRouter(config, router) {
    config.map([
      { route: ['', 'a'],  title: 'Bottom A',       moduleId: 'bottomlevela', nav:true },
      { route: 'b',     title: 'Bottom B',    moduleId: 'bottomlevelb', nav:true },
    ]);

    this.router = router;
  }

  activate(params) {
  	this.eventAggregator.publish(new TopLevelActivated(params.id));
  }
}

export class TopLevelActivated {
	constructor(id) {
		this.id = id;
	}
}