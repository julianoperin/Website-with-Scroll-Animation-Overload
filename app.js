let controller;
let slideScene;

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select some thinhs
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each slide
  sliders.forEach(slide => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    const explore = slide.querySelector(".explore");
    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" }
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
    slideTl.fromTo(explore, { x: "100%" }, { x: "0%" }, "-=0.1");
    //Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false
    })
      .setTween(slideTl)
      .addIndicators()
      .addTo(controller);
    //New Animation
  });
}

//Cursor Animation
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
  }
}
// toggle
function navToggle(e) {
  gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
  gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
  gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
}

// Event listener
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mousemove", activeCursor);

animateSlides();
