function rollDice(r){for(var d=/(\d*)d(\d+)([+-]?\d*)/.exec(r),e=0|d[1]||1,n=0|d[2],o=0|d[3],a=0;e--;)a+=0|Math.random()*n+1;return a+=o}
