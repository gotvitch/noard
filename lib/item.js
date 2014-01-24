
/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter,
    util = require('util');

function Item(options){
    this.getValue = options.getValue;
    this.interval = options.interval;
    this.name = options.name;
    this.value = null;
}


util.inherits(Item, EventEmitter);

Item.prototype.updateValue = function(){

    this.getValue((function(err, result){

        if(err){
            console.log('Error : ' + err.message);
        }

        if(result != this.value){
            this.value = result;
            this.emit('change', this.value);
        }

        setTimeout(this.updateValue.bind(this), this.interval * 1000);

    }).bind(this));

};


module.exports = Item;