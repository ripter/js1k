function lsystem(n,r){return r.split("").reduce(function(r,t){var u=n.find(function(n){return n[0]===t});return r+=u&&u[1]||t},"")}var rules=[["1","11"],["0","1[0]0"]];
