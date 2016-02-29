function ls(rules, source) {
  return source.split('').reduce(function(curr, code) {
    return curr += rules[code] || code;
  }, '');
}
