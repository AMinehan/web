var _ = {}

_.index = {length: 0};
_.classes = {};
_.escapes = {' ': '&#32;', '!': '&#33;', '"': '&#34;', '#': '&#35;', '$': '&#36;', '%': '&#37;', '&': '&#38;', "'": '&#39;', '(': '&#40;', ')': '&#41;', '*': '&#42;', '+': '&#43;', ',': '&#44;', '-': '&#45;', '.': '&#46;', '/': '&#47;', ':': '&#58;', ';': '&#59;', '<': '&#60;', '=': '&#61;', '>': '&#62;', '?': '&#63;', '@': '&#64;', '[': '&#91;', '\\': '&#92;', ']': '&#93;', '^': '&#94;', '_': '&#95;', '`': '&#96;', '{': '&#123;', '|': '&#124;', '}': '&#125;' };

_.init = function() {
  _.index[_.index.length] = new Element(null, div, null, _.index.length)
  _.root = _.index[index.length]
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
  return new Element(this, type, text, _.index.length);
}

Element.prototype.refresh = function(){

}

Element.prototype.style = function (css) {
  for (var style in css) {this.style = css[style]}
  css = JSON.stringify(css)
  if (classes.hasOwnProperty(css)) {
    classes[css].push(_.index[id])
  } else {
    classes[css] = [_.index[id]];
  }
}
_.helloWorld = function() {
  console.log('hello, world')
  return true;
}

_.escape = function(text) {
  var len;
  for (var i = 0; i < text.length; i++) {
    if (_.escapes.hasOwnProperty(text[i])) {
      len = _.escapes[text[i]].length
      text = text.slice(0, i) + _.escapes[text[i]] + text.slice(i + 1)
      i += len;
    }
  }
  return text
}

_.make = function (name, parentID, text) {
  var name = new Element(parentID, text, _.index.length)
  _.index[_.index.length] = name;
  _.index.length ++;
  return [name, _.index.length - 1];
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

_.refresh = function () {

}

//removes everything
_.clear = function () {
  for (var i = 0; i < _.index.length; i++){

  }
  _.index.length = 0;
  _.classes = {};
}