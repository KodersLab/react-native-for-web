// TODO: provide support for touch-enabled browsers instead of fallback to mouse events
// a dictionary of supported events
//var SUPPORT_TOUCH = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
// disable touch atm
var SUPPORT_TOUCH = false;
var MOUSE_POINTERS = {
	pointerdown: 'mousedown',
	pointerup: 'mouseup',
	pointerout: 'mouseout',
	pointermove: 'mousemove'
};

var IE10_POINTERS = {
	pointerdown: 'MSPointerDown',
	pointerup: 'MSPointerUp',
	pointerout: 'MSPointerOut',
	pointermove: 'MSPointerMove'
};

function normalizeTouchEvent(e){
	var j = {
		clientX: e.clientX,
		clientY: e.clientY
	};
	if(e.touches){
		j = {
			clientX: e.touches[0].clientX,
			clientY: e.touches[0].clientY
		}
	}
	return j;
}

function getEventName(event){
	var events = {};
	// there is support for pointer events in IE10
	if(window.MSPointerEvent){
		events = {
			...events,
			...IE10_POINTERS
		}
	// there is no pointer event support, falls to mouse events
	}else if(!window.PointerEvent){
		events = {
			...events,
			...MOUSE_POINTERS
		};
	}
	return events[event] ? events[event] : event;
}

function attachListener(element, event, fn){
	element.addEventListener(getEventName(event), fn);
}

function removeListener(element, event, fn){
	element.removeEventListener(getEventName(event), fn);
}

module.exports = {
	attachListener,
	removeListener,
	normalizeTouchEvent
};