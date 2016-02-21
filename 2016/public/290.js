function lsystem(rules, source) {
  return source.split('').reduce(function(curr, code) {
    var rule = rules.find(function(rule) {
      return rule[0] === code;
    });

    curr += (rule && rule[1]) || code;
    return curr;
  }, '');
}
var rules = [
  ['1', '11'],
  ['0', '1[0]0']
];
