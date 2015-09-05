// TODO: provide support for touch-enabled browsers instead of fallback to mouse events
// a dictionary of supported events
//var SUPPORT_TOUCH = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
// disable touch atm
var SUPPORT_TOUCH = false;
var MOUSE_FALLBACK = {
	touchstart: 'mousedown',
	touchend: 'mouseup',
	touchcancel: 'mouseout',
	touchmove: 'mousemove'
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
	if(!SUPPORT_TOUCH) event = MOUSE_FALLBACK[event] ? MOUSE_FALLBACK[event] : event;
	return event;
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