(function(){
 "use strict";
 try{
  var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  var el=document.getElementById("intro-logo");
  if(!el || reduce){
   if(el) el.style.display="none";
   return;
  }
  document.body.classList.add("locked");
  var done=false;
  function hide(){
   if(done)return;
   done=true;
   document.body.classList.remove("locked");
   el.classList.add("hide");
   setTimeout(function(){el.style.display="none";},650);
  }
  setTimeout(hide,1600);
  // safety net: never let the splash block the site
  setTimeout(hide,3500);
 }catch(e){
  var el2=document.getElementById("intro-logo");
  if(el2)el2.style.display="none";
  document.body.classList.remove("locked");
 }
})();