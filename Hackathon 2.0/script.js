const scroll = new LocomotiveScroll({
  el: document.querySelector('.main'),
  smooth: true
});
function firstPageAnim(){
var tl = gsap.timeline();

tl.from("#nav",{
  y:'-10',
  opacity:0,
  duration:1.5,
  ease:Expo.easeInOut
})
.to(".boundingelem",{
  y:0,
  delay:-1,
  duration:2,
  ease:Expo.easeInOut,
  stagger:.2
})
.from("#herofooter",{
  y:-10,
  opacity:0,
  duration:1.5,
  delay:-1,
  ease:Expo.easeInOut
})
}
function circleSqueezing(){
  //define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove",function(dets){
    
    //min:0.8 ,max:1.2
    //clamp available inside gsap,gsap utlis google search(greensock.com)
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev=dets.clientX;
    yprev=dets.clientY;
    
    circleMouseFollower(xscale, yscale);

    
    
  });
}

function circleMouseFollower(xscale,yscale){
  window.addEventListener("mousemove",function(dets){
    document.querySelector(".minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;

  })
}


circleSqueezing();

circleMouseFollower();

firstPageAnim();
document.querySelectorAll(".elem").forEach(function (elem) {
var rotate = 0;
var diffrot = 0;

elem.addEventListener("mouseleave", function (dets) {
  gsap.to(elem.querySelector("img"), {
    opacity: 0,
    ease: Power3,
    duration: 0.5,
  });
});

elem.addEventListener("mousemove", function (dets) {
  var diff = dets.clientY - elem.getBoundingClientRect().top;
  diffrot = dets.clientX - rotate;
  rotate = dets.clientX;
  gsap.to(elem.querySelector("img"), {
    opacity: 1,
    ease: Power3,
    top: diff,
    left: dets.clientX,
    rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
  });
});
});

function updateClock() {
  const clockElement = document.getElementById("clock");
  const currentTime = new Date();
  const options = { timeZone: "Asia/Kolkata", hour12: true, hour: "numeric", minute: "numeric" };
  const formattedTime = currentTime.toLocaleTimeString("en-IN", options);
  clockElement.textContent = formattedTime;
}
setInterval(updateClock, 60000);
updateClock();