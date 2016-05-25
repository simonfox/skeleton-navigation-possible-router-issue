import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TopLevelActivated} from './toplevel';

@inject(EventAggregator)
export class App {
constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;

    this.openTabs = [];

    this.id = 2;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'toplevel/:id', name:'toplevel',        moduleId: 'toplevel' },
    ]);

    this.router = router;
  }

  activate() {
  	this.eventAggregator.subscribe("OPEN", this.handleOpen.bind(this));
  	this.eventAggregator.subscribe(TopLevelActivated, this.handleActivated.bind(this));
  }

  handleOpen() {
  	let navigateTo = this.id;
  	this.id = this.id * 2;
  	this.router.navigate(`toplevel/${navigateTo}`);
  }

  handleActivated(activated) {
  	let existing = this.openTabs.find(x => x.id === activated.id);
  	if(!existing) {
  		let href = this.router.generate('toplevel', {id:activated.id});
  		this.openTabs.push({ id:activated.id, title: `Top ${activated.id}`, route: href});
	}
  }
}
