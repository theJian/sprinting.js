'use strict';

module.exports = function() {
  var result = [];

  for(let i = 0, len = arguments.length; i < len; i++) {
    let fn = arguments[i];
    if(typeof(fn) === 'function') {
      let startTicks = new Date().getTime();
      fn();
      let endTicks = new Date().getTime();
      result.push({
        'ID': 'func#' + (i+1),
        'Time': endTicks - startTicks
      });
    } else {
      result.push({
        'ID': 'func#' + (i+1),
        'Time': -1 // doesn't finish this race
      });
    }
  }

  result.sort((a, b) => {
    // a doesn't finish this race if a.Time is -1
    if(-1 === b.Time) return -1;
    return b.Time - a.Time;
  });

  for(let i = 0, len = result.length; i < len; i++) {
     console.log('# ' + i + ' ---- ' + result[i].Time + ' ---- ' + result[i].ID);
  }
}
