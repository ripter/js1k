var HEIGHT=390,WIDTH=312,SCORE_Y=225,PLANK_Y=215,HALF_HEIGHT=195,PLANK_X2=189,HALF_WIDTH=156,SCORE_WIDTH=128,PLANK_X1=125,SCORE_X=95,HEADER_Y=30,COIN='\uD83D\uDC8E',BOMB='\uD83D\uDCA3',FRAMES=[[0,0,3,8,5,4],[3,8,5,16,10,10],[5,16,8,24,15,16],[8,24,11,32,20,24],[11,32,15,44,25,36],[15,44,19,58,30,48],[19,58,22,70,35,60],[22,70,29,90,40,75],[29,90,35,112,45,99],[35,112,45,140,50,122],[45,140,55,175,55,155]],lastTimestamp=-HALF_WIDTH,currentItem=COIN,lives=3,isKeyDown=!1,score=0,frame=0;['click','touchend'].forEach((a)=>{b.addEventListener(a,()=>{8<=frame&&(isKeyDown=!0)})}),void function a(d){var e=FRAMES[frame];d-lastTimestamp>=HALF_WIDTH&&(lastTimestamp=d,c.fillStyle='#753',c.fillRect(0,0,WIDTH,HEIGHT),c.fillStyle='#000',c.beginPath(),c.arc(HALF_WIDTH,HALF_HEIGHT,HALF_WIDTH,0,Math.PI,!0),c.rect(0,HALF_HEIGHT,WIDTH,HALF_HEIGHT),c.fill(),isKeyDown&&frame==FRAMES.length-1&&(currentItem===COIN?(score+=1,c.fillStyle='#00F8'):currentItem==BOMB&&(lives-=1,c.fillStyle='#F008'),c.fillRect(0,0,WIDTH,HEIGHT)),c.lineWidth=1,[frame-4,frame-2,frame,frame+2].forEach((a,d)=>{if(FRAMES[a]){var e=FRAMES[a],f=(63*d).toString(16)[0];c.strokeStyle='#FFF'+f,c.fillStyle='#753'+f,c.beginPath(),c.moveTo(PLANK_X1-e[0],PLANK_Y+e[1]),c.lineTo(PLANK_X2+e[0],PLANK_Y+e[1]),c.lineTo(PLANK_X2+e[2],PLANK_Y+e[3]),c.lineTo(PLANK_X1-e[2],PLANK_Y+e[3]),c.lineTo(PLANK_X1-e[0],PLANK_Y+e[1]),c.fill(),c.stroke()}}),c.font='24px serif',c.fillStyle='#ffb',c.fillText(COIN+score,10,HEADER_Y),c.fillText(BOMB.repeat(lives),SCORE_Y,HEADER_Y),0>=lives&&c.fillText('Game Over',SCORE_X,HALF_WIDTH),c.font=12*frame+'px serif',c.fillText(currentItem,HALF_WIDTH-e[4],PLANK_Y+e[5]),c.strokeStyle='#FFFA',c.lineWidth=10,c.strokeRect(SCORE_X,SCORE_Y,SCORE_WIDTH,SCORE_WIDTH),frame+=1,frame===FRAMES.length&&(frame=0,currentItem=.5>Math.random()?BOMB:COIN,isKeyDown=!1)),0<lives&&window.requestAnimationFrame(a)}(0);