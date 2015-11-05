var path = require("path");
var defaultRelativeTo = path.join(__dirname, "..", "..", "..");

module.exports.options = {
    relativeTo: defaultRelativeTo
};

module.exports.configure = function (options) {
  module.exports.options = options;

  return module.exports;
};

module.exports = function image(context, request, callback) {
    if (/\.(png|jpg|jpeg|gif)$/.test(request)) {
        var imagePath = path.relative(module.exports.options.relativeTo || defaultRelativeTo, path.resolve(context, request));
        return callback(null, JSON.stringify({uri: imagePath, isStatic: true}));
    }

    // Every module prefixed with "image-" becomes {uri: image, isStatic: true}
    if(/^image\!/.test(request))
        return callback(null, JSON.stringify({uri: "images/" + request.substr(6) + ".png", isStatic: true}));
    callback();
};
