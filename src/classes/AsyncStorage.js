
var SUPPORT_LOCALSTORAGE = 'localStorage' in window; //check localStorage support
// AsyncStorage polyfill on LocalStorage

function getItem(key, callback) {
	return new Promise((resolve, reject) => {
		var value = localStorage.getItem(key) || null;
		callback && callback((!SUPPORT_LOCALSTORAGE) ? missingLocalStorage() : null, value);
		if (!SUPPORT_LOCALSTORAGE) {
			reject(missingLocalStorage());
		} else {
			resolve(value);
		}
	});
}

function setItem(key, value, callback) {
	return new Promise((resolve, reject) => {
		localStorage.setItem(key, value);
		callback && callback((!SUPPORT_LOCALSTORAGE) ? missingLocalStorage() : null);
		if (!SUPPORT_LOCALSTORAGE) {
			reject(missingLocalStorage());
		} else {
			resolve(null);
		}
	});
}

function removeItem(key, callback) {
	return new Promise((resolve, reject) => {
		localStorage.removeItem(key);
		callback && callback((!SUPPORT_LOCALSTORAGE) ? missingLocalStorage() : null);
		if (!SUPPORT_LOCALSTORAGE) {
			reject(missingLocalStorage());
		} else {
			resolve(null);
		}
	});
}

function recursiveMerge(destination, source){
	var notFound;
	for (var k in source){
		notFound = true; 
		for(var i in destination){
			// for each key in source, compare with each key in destination
			if(k === i){ //find when keys are equal
				notFound = false; //set that key exist in destination
				if(isObject(source[k])  && isObject(destination[i])){
					//if values are objects, merge them recursively
					destination[i] = recursiveMerge(destination[i],source[k]);
				}else{
					//if values are not objects overwrite destination with source
					destination[i] = source[k];
				}
			}
		}
		if(notFound){
			//if key is not found in destination, create it
			destination[k] = source[k];
		}
	}
	return destination;
}

function mergeItem(key, value, callback) {
	return new Promise((resolve, reject) => {
		var source, destination = localStorage.getItem(key) || null;
		try {
			source = JSON.parse(value);
			destination = JSON.parse(destination);
		} catch (e) {
			callback && callback(e);
			reject(e);
		}
		var obj = recursiveMerge(destination,source);
		localStorage.setItem(key, JSON.stringify(obj)); //save merged object
				
		callback && callback((!SUPPORT_LOCALSTORAGE) ? missingLocalStorage() : null);
		(SUPPORT_LOCALSTORAGE) ? resolve(null) : reject(missingLocalStorage());
	});
}

function clear(callback) {
	return new Promise((resolve, reject) => {
		localStorage.clear();
		callback && callback((!SUPPORT_LOCALSTORAGE) ? missingLocalStorage() : null);
		if (!SUPPORT_LOCALSTORAGE) {
			reject(missingLocalStorage());
		} else {
			resolve(null);
		}
	});
}

function getAllKeys(callback) {
	return new Promise((resolve, reject) => {
		var keys = Object.keys(localStorage);
		callback && callback((!SUPPORT_LOCALSTORAGE) ? missingLocalStorage() : null, keys);
		if (!SUPPORT_LOCALSTORAGE) {
			reject(missingLocalStorage());
		} else {
			resolve(keys);
		}
	});
}

function multiGet(keys, callback) {
	return new Promise((resolve, reject) => {
		var items = [];
		keys.forEach((key) => {
			items.push([key, localStorage.getItem(key)]);
		});
		callback && callback((!SUPPORT_LOCALSTORAGE) ? missingLocalStorage() : null, items);
		if (!SUPPORT_LOCALSTORAGE) {
			reject(missingLocalStorage());
		} else {
			resolve(items);
		}
	});
}

function multiSet(keyValuePairs, callback) {
	var promises = [];
	keyValuePairs.forEach((item) => {
		promises.push(setItem(item[0],item[1]));
	});
	return Promise.all(promises);
}

function multiRemove(keys, callback) {
	var promises = [];
	keys.forEach((key) => {
		promises.push(removeItem(key));
	});
	return Promise.all(promises);
}

function multiMerge(keyValuePairs, callback) {
	var promises = [];
	keyValuePairs.forEach((item) => {
		promises.push(mergeItem(item[0],item[1]));
	});
	return Promise.all(promises);
}

function isObject (item) {
  	return (typeof item === "object" && !Array.isArray(item) && item !== null);
}

function missingLocalStorage() {
	return new Error('Your device seems not to have localStorage. Further calls to AsyncStorage will fail.');
}

module.exports = {
	getItem, 
	setItem, 
	removeItem, 
	mergeItem, 
	clear, 
	getAllKeys, 
	multiGet, 
	multiSet, 
	multiRemove, 
	multiMerge
};