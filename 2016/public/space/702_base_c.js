!function(){function n(n,t){f.push({entry:n,delay:t||1e3})}function t(){var n=f.shift();n&&(c.font="36px Papyrus, fantasy",c.fillStyle="#001f3f",c.fillRect(0,0,a.width,a.height),c.fillStyle="#01FF70",o.shift(),o.push(n.entry),o.forEach(function(n,t){c.fillText(n,100,100+75*t)}),setTimeout(t,n.delay))}function i(n,t){return 0|(Math.random()*n+t||0)}function e(){var t={0:function(){n("Picking up a distress beacon.")},1:function(){n("Found an inhabited planet.")},2:function(){n("Refueling at nearby star.")},3:function(){n("Mining an astroid.")}};n("Leaving the spaceport.");for(var i=0;4>i;i++)t[u()]()}var f=[],o=[0,0,0,0,0],u=(i.bind(0,20,1),i.bind(0,8,1),i.bind(0,6,1),i.bind(0,4,1));e(),t()}();
