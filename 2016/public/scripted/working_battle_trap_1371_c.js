!function(){
  function n(a,n){
    f.push({
      entry:a,
      delay:n||1e3
    })}
    function t(){
      var n=f.shift();
      if(n){
        var e=n.entry;
        5===l.length&&l.shift(),
        l.push(e),
        c.font="36px Papyrus, fantasy",
        c.fillStyle="#001f3f",
        c.fillRect(0,0,a.width,a.height),
        c.fillStyle="#01FF70",
        l.forEach(function(a,n){
          c.fillText(a,100,100+75*n)
        }),
        setTimeout(t,n.delay)
      }
    }
    function e(a,n){
      return 0|(Math.random()*a+n||0)
    }
    function o(a,t){
      n("Battle: "+t.name+" hp: "+t.hp);
      for(var e,o=t.hp;a.hp>0&&o>0;){
        if(b()+a.bab>=t.ac?(e=a.dmg(),
           o-=e,
           n("Attack: "+e+" damage.")):n("Attack Missed"),
           t.hp<1){

          n("Won! My hp: "+a.hp);
          break
        }
        if(b()+t.bab>a.ac&&(e=t.dmg(),
           a.hp-=e,
           n("I was hit for "+e+" damage.")),
           a.hp<1){

          n("I was slain by a "+t.name);
          break
        }
      }
    }
    function i(a,t){
      n("I see a "+t.name);
      var e=b()+a.bab;
      e>=t.ac?
      (n("I found some gold coins!"),
      a.gold+=g())
      :
      (n("It was a trap!"),
      e=t.dmg(),
      a.hp-=e,
      n("I took "+e+" damage."))
    }
    function h(a){
      n("Status: HP "+a.hp+", Gold "+a.gold)
    }
    function d(){
      for(var a,n,t,c={hp:11,bab:5,ac:17,gold:0,dmg:m},d=[{name:"Goblin",hp:6,ac:13,bab:2,dmg:g},{name:"Goblin Dog",hp:9,ac:13,bab:2,dmg:p},{name:"Goblin Snake",hp:13,ac:14,bab:2,dmg:g},{name:"Golden Cat",hp:11,ac:15,bab:5,dmg:g}],f={name:"strange rocks",ac:13,dmg:g};c.hp>0;)
      n=g(),
      a=null,
      1===n&&(t=d[e(d.length)],o(c,t)),
      2===n&&i(c,f),
      4===n&&c.hp<11&&h(c)
    }
    var f=[],
    l=[],
    b=e.bind(0,20,1),
    m=e.bind(0,8,1),
    p=e.bind(0,6,1),
    g=e.bind(0,4,1);
    d(),
    t()
}();
