function lsystem(n,t){var r=t.split("").map(function(t){var r=n.split(",").find(function(n){return n.split(":")[0]===t});return r&&r.split(":")[1]||t});return r.join("")}var rules="1:11,0:1[0]0";
