// TODO: provide support for touch-enabled browsers instead of fallback to mouse events
// a dictionary of supported events
//var SUPPORT_TOUCH = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
var SUPPORT_TOUCH = false; // disable until touch support is fixed
var SUPPORT_IE10_POINTERS = window.MSPointerEvent;
var SUPPORT_POINTERS = window.PointerEvent;

var MOUSE_POINTERS = {
	pointerdown: 'mousedown',
	pointerup: 'mouseup',
	pointerout: 'mouseout',
	pointermove: 'mousemove'
};

var TOUCH_POINTERS = {
	pointerdown: 'touchstart',
	pointerup: 'touchend',
	pointerout: 'touchcancel',
	pointermove: 'touchmove'
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
	if(SUPPORT_IE10_POINTERS){
		events = {
			...events,
			...IE10_POINTERS
		};
	// there is pointer support, do nothing
	}else if(SUPPORT_POINTERS){
	// there is touch support
	}else if(SUPPORT_TOUCH){
		events = {
			...events,
			...TOUCH_POINTERS
		};
	// there is no support... mouse come at me!
	}else{
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