function lsystem(rules, source) {
  var result = '';
  for (var i=0; i < source.length; i++) {
    var found = false;
    for(var j=0; j < rules.length; j++) {
      if (rules[j][0] === source[i]) {
        result += rules[j][1];
        found = true;
        break;
      }
    }
    if (!found){
      result += source[i];
    }
  }
  return result;
}
var rules = [
  ['1', '11'],
  ['0', '1[0]0']
];
