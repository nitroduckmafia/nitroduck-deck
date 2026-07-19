import React from 'react';
/* Wind-borne pollen field: grains stream from a source on the right and drift left,
   sizes from fine dust to large; big grains carry exine ornamentation; a few sketched
   petals tumble along. Absolutely positioned to fill its (position:relative) parent. */
export function PollenField({ width = 770, height = 440, animate = true, petals = 6, exine = true, style = {} }) {
  const svg = React.useMemo(() => build(width, height, animate, petals, exine), [width, height, animate, petals, exine]);
  return React.createElement('div', { 'aria-hidden': 'true', style: { position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', ...style } }, svg);
}
const GOLD = '#D2A24C', GRAIN = '#CDC98A', PETAL = '#EFC85A';
const PET = ['M0 0C-.5-.26-.63-.7-.29-.95C-.1-1.06.1-1.06.29-.95C.63-.7.5-.26 0 0Z','M0 0C-.52-.28-.67-.73-.3-.97C-.14-1.05-.04-.93 0-.86C.04-.93.14-1.05.3-.97C.67-.73.52-.28 0 0Z','M0 0C-.34-.3-.5-.76-.15-1C.05-1.08.36-.96.41-.6C.43-.34.3-.12 0 0Z','M0 0C-.3-.34-.7-.6-.5-.9C-.34-1.08.34-1.08.5-.9C.7-.6.3-.34 0 0Z'];
function build(W, H, animate, petals, exine) {
  const h = React.createElement, R = (a,b)=>a+Math.random()*(b-a);
  const O = { x: W*0.83, y: H*0.46 };
  const groups = [[],[],[]]; let n = 0, exc = 0, pc = 0;
  const blob = (cx,cy,r,asp,rot,irr,pts)=>{const P=[];for(let i=0;i<pts;i++){const a=i/pts*6.283,rad=r*(1+R(-irr,irr));let x=Math.cos(a)*rad*asp,y=Math.sin(a)*rad;P.push({x:cx+x*Math.cos(rot)-y*Math.sin(rot),y:cy+x*Math.sin(rot)+y*Math.cos(rot)});}let d='M'+((P[pts-1].x+P[0].x)/2).toFixed(1)+' '+((P[pts-1].y+P[0].y)/2).toFixed(1);for(let i=0;i<pts;i++){const c=P[i],x=P[(i+1)%pts];d+='Q'+c.x.toFixed(1)+' '+c.y.toFixed(1)+' '+((c.x+x.x)/2).toFixed(1)+' '+((c.y+x.y)/2).toFixed(1);}return d+'Z';};
  const exineEls = (x,y,r,op)=>{const els=[];const rk=(d,o2,w)=>els.push(h('path',{key:'e'+(exc++),d,fill:'none',stroke:'rgba(48,52,28,'+o2+')',strokeWidth:w||0.6,strokeLinecap:'round'}));const dt=(cx,cy,rr,o2)=>els.push(h('circle',{key:'e'+(exc++),cx:cx.toFixed(1),cy:cy.toFixed(1),r:rr.toFixed(1),fill:'rgba(44,48,24,'+o2+')'}));const t=Math.random();
    if(t<0.58){const nn=7+(Math.random()*4|0),P=[];for(let i=0;i<nn;i++){const a=R(0,6.283),rr=R(r*0.1,r*0.78);P.push({x:x+Math.cos(a)*rr,y:y+Math.sin(a)*rr});}for(let i=0;i<nn;i++){const a=P[i],b=P[(i+1)%nn],c=P[(i+2)%nn];rk('M'+a.x.toFixed(1)+' '+a.y.toFixed(1)+'L'+b.x.toFixed(1)+' '+b.y.toFixed(1),(op*0.55).toFixed(2));rk('M'+a.x.toFixed(1)+' '+a.y.toFixed(1)+'L'+c.x.toFixed(1)+' '+c.y.toFixed(1),(op*0.4).toFixed(2));}}
    else if(t<0.78){const ang=R(0,3.14),dx=Math.cos(ang),dy=Math.sin(ang),px=-dy,py=dx;for(let i=-2;i<=2;i++){const off=i*r*0.3,len=r*0.72*Math.sqrt(Math.max(0.05,1-(i*0.3)*(i*0.3))),cx=x+px*off,cy=y+py*off;rk('M'+(cx-dx*len).toFixed(1)+' '+(cy-dy*len).toFixed(1)+'Q'+(cx+px*1.6).toFixed(1)+' '+(cy+py*1.6).toFixed(1)+' '+(cx+dx*len).toFixed(1)+' '+(cy+dy*len).toFixed(1),(op*0.42).toFixed(2));}}
    else{const nn=5+(Math.random()*4|0);for(let i=0;i<nn;i++){const a=R(0,6.283),rr=R(0,r*0.6);dt(x+Math.cos(a)*rr,y+Math.sin(a)*rr,R(0.5,1.1),(op*0.5).toFixed(2));}}
    return els;};
  const addGrain=(x,y,r,gi,dist)=>{const op=Math.max(0.16,0.94-dist/(W*0.98));const col=Math.random()<0.34?GOLD:GRAIN;n++;const d=blob(x,y,r,R(0.62,1.38),R(0,6.283),r>2?0.24:0.36,r>2.4?9:7);groups[gi].push(h('path',{key:'g'+n,d,fill:col,fillOpacity:op}));groups[gi].push(h('path',{key:'rm'+n,d,fill:'none',stroke:'#EDE3B0',strokeWidth:Math.max(0.4,r*0.13).toFixed(2),strokeOpacity:op*0.45}));if(exine&&r>2.9)exineEls(x,y,r,op).forEach(e=>groups[gi].push(e));};
  for(let s=0;s<16;s++){const ay=O.y+R(-H*0.46,H*0.46),endX=R(-30,W*0.26),endY=ay+R(-H*0.32,H*0.32),c1x=O.x-W*0.25,c1y=ay+R(-46,46),c2x=W*0.35,c2y=endY+R(-58,58);for(let k=0;k<11;k++){const t=Math.min(1.06,k/10*R(0.86,1.08)),mt=1-t;const bx=mt*mt*mt*O.x+3*mt*mt*t*c1x+3*mt*t*t*c2x+t*t*t*endX;const by=mt*mt*mt*O.y+3*mt*mt*t*c1y+3*mt*t*t*c2y+t*t*t*endY;const jx=bx+R(-16,16),jy=by+R(-16,16),dist=Math.max(0,O.x-jx),r=Math.max(0.8,3.2*(1-t*0.5)*R(0.4,1.5)),gi=r>3.2?0:r>1.8?1:2;addGrain(jx,jy,r,gi,dist);}}
  for(let k=0;k<200;k++){const x=R(0,W),y=R(0,H),r=R(0.45,1.3);addGrain(x,y,r,2,Math.abs(O.x-x));}
  for(let k=0;k<14;k++){const x=R(W*0.1,W*0.9),y=R(H*0.08,H*0.92),r=R(4,6.6);addGrain(x,y,r,0,Math.abs(O.x-x));}
  for(let k=0;k<petals;k++){pc++;const S=R(18,34),pd=PET[(Math.random()*PET.length)|0],px=R(W*0.05,W*0.95),py=R(H*0.08,H*0.92);const inner=[h('path',{key:'pa'+pc,d:pd,fill:'none',stroke:PETAL,strokeWidth:(1.4/S).toFixed(3),strokeOpacity:.6,strokeLinecap:'round',strokeLinejoin:'round'})];if(Math.random()<0.6)inner.push(h('path',{key:'pk'+pc,d:'M-.34-.8C-.12-.92.12-.92.34-.8',fill:'none',stroke:PETAL,strokeWidth:(0.9/S).toFixed(3),strokeOpacity:.3,strokeLinecap:'round'}));groups[pc%2].push(h('g',{key:'pt'+pc,transform:'translate('+px.toFixed(1)+' '+py.toFixed(1)+') rotate('+R(0,360).toFixed(1)+') scale('+S.toFixed(1)+')',style:{opacity:0.3}},inner));}
  const layer=(arr,anim,dur)=>h('g',animate?{style:{animation:anim+' '+dur+' ease-in-out infinite',willChange:'transform'}}:null,arr);
  return h('svg',{viewBox:'0 0 '+W+' '+H,preserveAspectRatio:'xMidYMid slice',style:{position:'absolute',inset:0,width:'100%',height:'100%'}},
    h('style',null,'@keyframes ndpf1{0%,100%{transform:translate(0,0)}50%{transform:translate(-9px,7px)}}@keyframes ndpf2{0%,100%{transform:translate(0,0)}50%{transform:translate(-15px,-8px)}}@keyframes ndpf3{0%,100%{transform:translate(0,0)}50%{transform:translate(-6px,-4px)}}'),
    layer(groups[2],'ndpf3','16s'), layer(groups[1],'ndpf2','12s'), layer(groups[0],'ndpf1','9s'));
}
