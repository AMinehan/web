var _ = function () {}

var index = {length: 0};
var classes = {};


var Element = function (parent, text, length) {
  this.id = length;

}

_.prototype.make = function (name, parentID, text) {
  var name = new Element(parentID, text, index.length)
  index[index.length] = name;
  index.length ++;
  return [name, index.length - 1];
}

_.prototype.style = function (id, css) {
  if (classes.hasOwnProperty(css)) {
    classes[css].push(index[id])
  } else {
    classes[css] = [index[id]];
  }
}

//returns an array of dom elements with a css class
_.prototype.findByClass = function (css) {
  if (css) {
    return classes[css];
  }
  return [];
}

_.prototype.remove = function () {

}

_.prototype.findById = function (id) {

}

//removes everything
_.prototype.clear = function () {
  for (var i = 0; i < index.length; i++){

  }
  index.length = 0;
  classes = {};
}