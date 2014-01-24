
/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter,
    Item = require('./item'),
    _ = require('lodash');

function Api(){
  this.items = [];
}


Api.prototype.__proto__ = EventEmitter.prototype;


Api.prototype.setup = function(settings){

    settings.forEach((function(setting){
        var item = new Item(setting);

        item.on('change', (function(){
            this.emit('change', item);
        }).bind(this));

        item.updateValue();

        this.items.push(item);
    }).bind(this))
};


Api.prototype.getValues = function(){
    return _.map(this.items, function(item){
        return {
            name: item.name,
            value: item.value
        }
    })
};

module.exports = new Api();
module.exports.create = function() {
  return new Api();
};
