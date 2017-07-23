export function da(attribute, value){
  var opts = {};
  if(typeof value !== 'undefined' && value !== null) {
    opts['"'+attribute+'"'] = value;
    return opts;
  }
  return false;
};
