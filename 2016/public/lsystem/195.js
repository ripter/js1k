var lsystem = (function(rules, source) {
  return source.split('').reduce(function(curr, code) {
    return curr += rules[code] || code;
  }, '');
}).bind(null, {
  '1': '11',
  '0': '1[0]0'
});
