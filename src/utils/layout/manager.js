// this manager emits and event whenever something changed it's size
// so this way you can look up for onLayout changes
var EventEmitter = require('eventemitter3');

class LayoutManager extends EventEmitter{
	constructor(){
		super();
		
		// autobinding
		this.deferUpdate = this.deferUpdate.bind(this);
		this.update = this.update.bind(this);
	}
	
	attach(fn){
		this.on('redraw', fn);
	}
	
	detach(fn){
		this.off('redraw', fn);
	}
	
	// performs an update now.
	update(){
		this.emit('redraw');
	}
	
	// deferred update, so multiple updates can batch up
	deferUpdate(){
		if(this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(this.update, 10);
	}
}

var manager = new LayoutManager();

// bind the layout manager to the window resize, so we can update the layout on window resize
window.addEventListener('resize', manager.deferUpdate);

module.exports = manager;