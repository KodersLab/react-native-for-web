// this is a polyfill ot the AppRegistry class
var {render} = require('react-dom');
var React = require('react');

class AppRegistry{
	// create a storage
	constructor(){
		this.runnables = {};
	}
	
	// register the config
	registerConfig(config){
		for(var i = 0; i < config.length; i++){
			var appConfig = config[i];
			if (appConfig.run) {
				this.registerRunnable(appConfig.appKey, appConfig.run);
			} else {
				this.registerComponent(appConfig.appKey, appConfig.component);
			}
		}
	}
	
	// returns the app keys
	getAppKeys(){
		return Object.keys(this.runnables);
	}
	
	// register a runnable
	registerRunnable(appKey, func){
		this.runnables[appKey] = func;
		return appKey;
	}
	
	// register a component
	registerComponent(appKey, getComponentFunc){
		this.runnables[appKey] = {
		run: (appParameters) =>
			// TODO: instead of forcing a div with #app, maybe we should allow to configure it
			render(React.createElement(getComponentFunc(), appParameters.initialProps), document.getElementById('app'))
		};
		// TODO: this is temporary, and automatically launch the just added runnable, we should instead auto append it somehow.
		this.runApplication(appKey, {});
		return appKey;
	}
	
	runApplication(appKey, appParameters) {
		this.runnables[appKey].run(appParameters);
	}
}

module.exports = new AppRegistry();