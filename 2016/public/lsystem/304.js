function lsystem(rules, source) {
  var result = source.split('').map(function(code) {
    var rule = rules.split(',').find(function(rule) {
      return rule.split(':')[0] === code;
    });

    return (rule && rule.split(':')[1]) || code;
  });

  return result.join('');
}
var rules = '1:11,0:1[0]0';
