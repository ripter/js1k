function lsystem(rules, source) {
  return source.split('').reduce(function(curr, code) {
    return curr += rules[code] || code;
  }, '');
}
var rules = {
  '1': '11',
  '0': '1[0]0'
};
