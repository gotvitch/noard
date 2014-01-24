
var count = 0;

require('../index')({
    values:
    [
        {
            name: 'Test',
            interval: 5,
            getValue: function(callback){
                count += 1;
                callback(null, count);
            }
        }
    ]
});