class EventSubscriber{
	remove(){
		
	}
}

class DeviceEventEmitter{
	addListener(fn){
		return new EventSubscriber();
	}
}

module.exports = new DeviceEventEmitter();