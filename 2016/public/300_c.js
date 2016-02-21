var lsystem=function(n,r){var t=r.split("").map(function(r){var t=n.find(function(n){return n[0]===r});return t&&t[1]||r});return t.join("")}.bind(null,[["1","11"],["0","1[0]0"]]);
