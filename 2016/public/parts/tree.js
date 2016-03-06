
      // 81 bytes uglified
      function ls(rules, source) {
        return source.split('').reduce(function(curr, code) {
          return curr += rules[code] || code;
        }, '');
      }

      var axiom = 'M';
      var rules = {
        'M': 'S:C:R',
        'S': 'M S'
      };


      // Render an L-system string.
      function render(origin, source) {
        console.log(source);
      }



      var func = ls.bind(null, rules);
      var origin = {
        x: c.canvas.width/2,
        y: c.canvas.height,
        a: 6*(Math.PI/4) //angle
      };
      var iter = func(axiom);
      var draw = render.bind(null, origin);


      var count = 0;
      var interval = setInterval(function () {
        draw(iter);
        iter = func(iter);
        count++;

        if (count > 5) {
          clearInterval(interval);
        }
      }, 500);
