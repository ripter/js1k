function lsystem(r,e){for(var n="",t=0;t<e.length;t++){for(var a=!1,f=0;f<r.length;f++)if(r[f][0]===e[t]){n+=r[f][1],a=!0;break}a||(n+=e[t])}return n}var rules=[["1","11"],["0","1[0]0"]];
