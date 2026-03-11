import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initAnimations = () => {
  const wrapper = document.querySelector(".hero-about-wrapper");
  const heroSection = document.querySelector(".hero");
  const aboutSection = document.querySelector(".about");

  if (wrapper && heroSection && aboutSection) {
    // Set initial state for About: hidden, small, centered
    gsap.set(aboutSection, {
      opacity: 0,
      scale: 0.6,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
      },
    });

    // .heroT moves to .logo position and shrinks
    const heroT = document.querySelector(".heroT");
    const logo = document.querySelector(".logo");
    if (heroT && logo) {
      const heroTRect = heroT.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();
      const dx =
        logoRect.left +
        logoRect.width / 2 -
        (heroTRect.left + heroTRect.width / 2);
      const dy =
        logoRect.top +
        logoRect.height / 2 -
        (heroTRect.top + heroTRect.height / 2);
      const scaleRatio = logoRect.height / heroTRect.height || 0.15;

      tl.to(
        ".heroT",
        {
          x: dx,
          y: dy,
          scale: scaleRatio,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );
    }

    // .heroSubP pushes up and fades
    tl.to(
      ".heroSubP",
      { y: "-100px", opacity: 0, duration: 1, ease: "power2.in" },
      0,
    );

    // .heroP pushes down and fades
    tl.to(
      ".heroP",
      { y: "100px", opacity: 0, duration: 1, ease: "power2.in" },
      0,
    );

    // canvas#welcome zooms in and fades
    tl.to(
      "canvas#welcome",
      { scale: 3, opacity: 0, duration: 1, ease: "power2.in" },
      0,
    );

    // About appears only after hero elements are gone
    tl.to(
      aboutSection,
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      1,
    );
  }

  // Fade Up Elements
  const fadeUpElements = document.querySelectorAll(".fade-up");
  fadeUpElements.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    );
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
});
