function rollDice(r){var e=/(\d*)d(\d+)([+-]?\d*)/,n=e.exec(r),o=parseInt(n[1],10)||1,d=parseInt(n[2],10),i=parseInt(n[3],10)||0,t=0;if(Number.isNaN(d))throw new Error("Number of sides on dice not specified. "+r);for(;o--;)t+=0|Math.random()*d+1;return t+=i}
