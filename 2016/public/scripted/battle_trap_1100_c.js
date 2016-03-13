!function(){
  function n(n){
    c.fillStyle="#001f3f",
    c.fillRect(0,0,a.width,a.height),
    c.fillStyle="#01FF70",
    n.forEach(
      function(n,a){
        c.fillText(n,100,100+75*a),
        console.log(n)
      }
    )
  }
  function t(a){
    function t(n){
      return 5===o.length&&o.shift(),
      o.push(n),
      o
    }
    function e(o,r){
      var c=a[o],u=c[r];
      if(a.length!==o){
        if(c.length===r)
          return setTimeout(
            e.bind(0,o+1,0),
            2e3
          );
        n(t(u)),
        setTimeout(e.bind(0,o,r+1),1e3)
      }
    }
    var o=[];e(0,0)}
    function e(){return 0|20*Math.random()+1}
    function o(){return 0|4*Math.random()+1}
    function r(n,a){
      var t,o=["I spotted a "+a.name+".",e()+n.bab>=a.ac?"The "+a.name+" was no match for me!":"I managed to flee."];return e()+a.bab>n.ac&&(t=a.dmg(),n.hp-=t,o.push("I took "+t+" damage.")),o
    }
    function u(n,a){
      var t=["I see a "+a.name],r=e()+n.bab;return r>=a.ac?(t.push("I found some gold coins!"),n.gold+=o()):(t.push("It was a trap!"),r=a.dmg(),n.hp-=r,t.push("I took "+r+" damage.")),t
    }
    function f(){
      for(var n,a,t=[],e={
        hp:11,bab:5,ac:17,gold:0
      },
        c={name:"Goblin",bab:2,ac:13,dmg:o},
        f={name:"strange rocks",ac:13,dmg:o};
        e.hp>0;
      )
      a=o(),
      1===a&&(n=r(e,c)),
      2===a&&(n=u(e,f)),
      t.push(n);
      return t
    }
    c.font="36px Papyrus, fantasy";
    var i=f();
    t(i)
}();
