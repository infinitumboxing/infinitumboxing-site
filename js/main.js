(function(){
 "use strict";
 var menuBtn=document.getElementById("menu"),nav=document.getElementById("nav");
 if(menuBtn&&nav){
  menuBtn.addEventListener("click",function(){
   var open=nav.classList.toggle("open");
   menuBtn.setAttribute("aria-expanded",open);
  });
 }
 // mega menu: desktop opens on hover via CSS; this handles tap/click on touch + keyboard
 document.querySelectorAll(".mega-trigger").forEach(function(btn){
  btn.addEventListener("click",function(e){
   e.preventDefault();
   var li=btn.closest(".has-mega");
   var wasOpen=li.classList.contains("open");
   document.querySelectorAll(".has-mega.open").forEach(function(o){o.classList.remove("open");o.querySelector(".mega-trigger").setAttribute("aria-expanded","false");});
   if(!wasOpen){li.classList.add("open");btn.setAttribute("aria-expanded","true");}
  });
 });
 document.addEventListener("click",function(e){
  if(!e.target.closest(".has-mega")){
   document.querySelectorAll(".has-mega.open").forEach(function(o){o.classList.remove("open");o.querySelector(".mega-trigger").setAttribute("aria-expanded","false");});
  }
 });

 // smooth scroll-reveal for any element with class "reveal" - used site-wide
 if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(entries){
   entries.forEach(function(en){
    if(en.isIntersecting){en.target.classList.add("show");io.unobserve(en.target);}
   });
  },{threshold:.15,rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});
 }else{
  document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("show");});
 }

 var yr=document.getElementById("yr");
 if(yr)yr.textContent=new Date().getFullYear();
})();