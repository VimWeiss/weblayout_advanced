let tl = gsap.timeline();

tl.from(".site", {opacity: 0, duration: 0.4})
  .from(".hero__title", {y: 60, opacity: 0, duration: 1})
  .from(".hero__btn", {y: 60, opacity: 0, duration: 1},"-=1")
  .from(".hero__descr", {opacity: 0, duration: 0.5})
  .from(".photos-wrap__1", {opacity: 0, scale:0.5, duration: 0.5}, "-=0.5")
  .from(".photos-wrap__2", {opacity: 0, scale:0.5, duration: 0.5})
  .from(".photos-wrap__3", {opacity: 0, scale:0.5, duration: 0.5})
  .from(".photos__author", {opacity: 0, duration: 0.5});


// burger menu

let burgerTl = gsap.timeline({paused: true});

burgerTl.fromTo(".menu", {display: "none"}, {display: "block", duration: 0.1})
  .fromTo(".menu__top", {y: -100}, {y: 0, duration: 0.5, ease: "back.out(3)"})
  .from(".menu__container", {opacity: 0, y: -50, duration: 0.3})
  .from(".nav__list", {opacity: 0, y: -50, duration: 0.3}, "-=0.3")
  .from(".social", {y: -50, opacity: 0, duration: 0.4})
  .from(".menu__right", {y: 60, opacity: 0, duration: 0.4})

const burger = document.querySelector('.burger');
const btnReset = document.querySelector('.btn-reset');
burger.addEventListener('click', function() {
  burgerTl.play()
  })

  btnReset.addEventListener('click', function() {
    burgerTl.reverse();
   })


// document.querySelector('.burger').addEventListener("click", function() {
//   let tl2 = gsap.timeline({paused: true, onReverseComplete: tweenComplet});
//     setTimeout(() => {
//       tl2.fromTo(".menu__top", {y: -100}, {y: 0, duration: 0.7, ease: "back.out(3)"})
//      .from(".menu__container", {opacity: 0, y: -50, duration: 0.7})
//      .from(".menu__nav", {opacity: 0, y: -50, duration: 0.7})
//      .from(".list-reset", {y: -50, opacity: 0, duration: 1})
//      .from(".menu__right", {y: 60, opacity: 0, duration: 1})
//     }, 500);
//     document.querySelector('.btn-reset').addEventListener("click", function() {
//       tl2.reverse();
//     })
// });
