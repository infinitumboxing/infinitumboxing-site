(function(){
 "use strict";
 var form=document.getElementById("quote-form");
 if(!form) return;
 var status=document.getElementById("quote-status");
 var btn=document.getElementById("quote-submit");

 form.addEventListener("submit", function(e){
  e.preventDefault();
  if(btn){btn.disabled=true; btn.textContent="Sending...";}
  if(status){status.className="form-status"; status.textContent="";}

  var data=new FormData(form);

  fetch("https://api.web3forms.com/submit", {
   method: "POST",
   headers: {"Accept":"application/json"},
   body: data
  })
  .then(function(res){ return res.json(); })
  .then(function(json){
   if(json && json.success){
    form.reset();
    if(status){status.className="form-status ok"; status.textContent="Thank you! Your request has been sent \u2014 we'll reply with pricing and lead time shortly.";}
   }else{
    if(status){status.className="form-status err"; status.textContent="Something went wrong sending your request. Please call or WhatsApp us instead: +92 302 6115717.";}
   }
  })
  .catch(function(){
   if(status){status.className="form-status err"; status.textContent="Could not send right now. Please call or WhatsApp us instead: +92 302 6115717.";}
  })
  .finally(function(){
   if(btn){btn.disabled=false; btn.textContent="Send Quote Request";}
  });
 });
})();