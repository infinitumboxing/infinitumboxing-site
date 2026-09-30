(function(){

"use strict";

var hero=document.querySelector(".hero"),
    bg=hero&&hero.querySelector(".hero-bg");

if(!hero||!bg||!bg.dataset.bg)return;

var urls=bg.dataset.bg.split(",").map(function(u){
  return u.trim();
}).filter(Boolean);

if(!urls.length)return;

var slides=urls.map(function(u,i){
  var d=document.createElement("div");
  d.className="hb-slide";
  d.style.backgroundImage="url('"+u+"')";
  if(i===0)d.classList.add("on");
  bg.appendChild(d);
  return d;
});

hero.classList.add("has-bg");

if(slides.length<2)return;

var pos=0,t=null,x=null;

function show(k){

  var prev=slides[pos];

  pos=(k+slides.length)%slides.length;

  var next=slides[pos];

  if(next===prev)return;

  next.style.zIndex="2";
  prev.style.zIndex="1";

  next.classList.add("on");

  setTimeout(function(){
    prev.classList.remove("on");
  },1200);
}

function run(){
  clearInterval(t);
  t=setInterval(function(){
    show(pos+1);
  },5000);
}

/* Mobile swipe */
hero.addEventListener("touchstart",function(e){
  x=e.touches[0].clientX;
},{passive:true});

hero.addEventListener("touchend",function(e){

  if(x===null)return;

  var d=e.changedTouches[0].clientX-x;

  x=null;

  if(Math.abs(d)>40){
    show(d<0?pos+1:pos-1);
    run();
  }

},{passive:true});

/* Pause when tab/page is hidden */
document.addEventListener("visibilitychange",function(){
  if(document.hidden){
    clearInterval(t);
  }else{
    run();
  }
});

run();

})();