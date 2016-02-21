var lsystem=function(n,r){return r.split("").reduce(function(r,t){return r+=n[t]||t},"")}.bind(null,{1:"11",0:"1[0]0"});
