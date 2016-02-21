var lsystem = (function(rules, source) {
  var result = source.split('').map(function(code) {
    var rule = rules.find(function(rule) {
      return rule[0] === code;
    });

    return (rule && rule[1]) || code;
  });

  return result.join('');
}).bind(null, [
  ['1', '11'],
  ['0', '1[0]0']
]);
