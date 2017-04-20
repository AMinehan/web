var _ = {}
var hi = function () {}
var index = {length: 0};
var classes = {};

var init = function() {
  index[index.length] = new Element(null, div, null, index.length)
  _.root = index[index.length]
}

var Element = function (parent, type, text, length) {
  this.id = length;
  this.children = [];
  this.parent = parent;
}

Element.prototype.track = function(func){
  this.tracked = func;
}

Element.prototype.spawn = function(type, text) {
  return new Element(this, type, text, index.length);
}

_.helloWorld = function() {
  console.log('hello, world')
  return true;
}

_.make = function (name, parentID, text) {
  var name = new Element(parentID, text, index.length)
  index[index.length] = name;
  index.length ++;
  return [name, index.length - 1];
}

_.style = function (id, css) {
  if (classes.hasOwnProperty(css)) {
    classes[css].push(index[id])
  } else {
    classes[css] = [index[id]];
  }
}

//returns an array of dom elements with a css class
_.findByClass = function (css) {
  if (css) {
    return classes[css];
  }
  return [];
}

_.remove = function () {

}

_.findById = function (id) {

}


//removes everything
_.clear = function () {
  for (var i = 0; i < index.length; i++){

  }
  index.length = 0;
  classes = {};
}