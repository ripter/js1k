function ls(rules, source) {
  for(var i=0, r='';
  i < source.length &&
  (r += rules[source[i]] || source[i])
  ; i++){}
  return r;
}
