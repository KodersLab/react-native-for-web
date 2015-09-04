module.exports = function(context, request, callback) {
    // Every module prefixed with "image-" becomes {uri: image, isStatic: true}
    if(/^image\!/.test(request))
        return callback(null, JSON.stringify({uri: "images/" + request.substr(6) + ".png", isStatic: true}));
    callback();
};
