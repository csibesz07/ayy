
var common={};
common.ACCEPTED=202;
common.DONE=200;
common.GONE=200;
common.NOT_FOUND=404;

common.makeid= (previous_ids) => {
  var id = "9au8U";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (previous_ids.contains(id)) {
    id = ""
    for (var i = 0; i < 5; i++)
      id += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return id;
}

/*
* Recursively merge properties of two objects
*/
common.mergeRecursive= (obj1, obj2) => {

  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);

      } else {
        obj1[p] = obj2[p];

      }

    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];

    }
  }

  return obj1;
}

common.getTypeForTask=(types,task) => {
   if (!task.name) return {}
   if (typeof types != 'object') return {}
   for (let key of Object.keys(types))
     for (let type of types[key].types)
       if (task.name == type.name)
         return {type,key}
   return {}
 }


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

Array.prototype.last = function(){
        return this[this.length - 1];
};

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--)
        if (this[i] === obj)
            return true;
    return false;
}

Array.prototype.removeObj = function(obj) {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] === obj) {
           this.splice(i, 1);
        }
    }
}


module.exports=common
