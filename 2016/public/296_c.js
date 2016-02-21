function lsystem(n,r){var t=r.split("").map(function(r){var t=n.find(function(n){return n[0]===r});return t&&t[1]||r});return t.join("")}var rules=[["1","11"],["0","1[0]0"]];
