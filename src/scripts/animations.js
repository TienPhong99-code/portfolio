import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const initAnimations = () => {
  const wrapper = document.querySelector(".hero-about-wrapper");
  const heroSection = document.querySelector(".hero");
  const aboutSection = document.querySelector(".about");
  const textElement = document.querySelector(".text-animation__text");

  let splitText;

  if (textElement) {
    splitText = new SplitType(textElement, {
      types: "words",
      tagName: "span"
    });

  }

  if (wrapper && heroSection && aboutSection) {

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      }
    });

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

      heroTimeline.to(".heroT", {
        x: dx,
        y: dy,
        scale: scaleRatio,
        ease: "power2.inOut"
      }, 0);
    }

    heroTimeline.to(".heroSubP", { y: -100, opacity: 0 }, 0);
    heroTimeline.to(".heroP", { y: 100, opacity: 0 }, 0);
    heroTimeline.to("canvas#welcome", { scale: 3, opacity: 0 }, 0);

  }

  // ABOUT WORD REVEAL
  if (splitText && aboutSection) {

    const aboutTextTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: "200% 50%",
        end: "200% top",
        scrub: true
      }
    });

    aboutTextTimeline.to(splitText.words, {
      opacity: 1,
      y: 0,
      color: "rgb(255 255 255 / 1)",
      stagger: 0.15,
      ease: "none"
    });
  }
  ScrollTrigger.refresh();
   initProjectsScroll();
};
function initProjectsScroll() {
  const section = document.querySelector(".projects-section");
  const wrapper = document.querySelector(".projects-wrapper");

  if (!section || !wrapper) return;

  const scrollWidth = wrapper.scrollWidth;

  gsap.to(wrapper, {
    x: () => -(scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => "+=" + scrollWidth,
      scrub: true,
      pin: true,
      invalidateOnRefresh: true,
        anticipatePin: 1
    }
  });
}
function initTechIconsMotion() {
  const icons = gsap.utils.toArray(".tech-icon");
  const paths = gsap.utils.toArray(".tech-path");

  if (!icons.length || !paths.length) return;

  const pathCount = paths.length;

  // nhóm icon theo path
  const groups = Array.from({ length: pathCount }, () => []);

  icons.forEach((icon, i) => {
    const pathIndex = i % pathCount;
    groups[pathIndex].push(icon);
  });

  groups.forEach((iconsOnPath, pathIndex) => {
    const path = paths[pathIndex];
    const total = iconsOnPath.length;

    iconsOnPath.forEach((icon, i) => {

      // chia đều khoảng cách
      const spacing = 1 / total;
      const start = i * spacing;

      gsap.set(icon, {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start,
          end: start
        }
      });

      gsap.to(icon, {
        duration: 25 + pathIndex * 5, // tốc độ khác nhau
        repeat: -1,
        ease: "none",
        motionPath: {
          path,
          align: path,
           alignOrigin: [0.5, 0.5],
          start,
          end: start + 1
        }
      });
    });
  });
}
window.addEventListener("load", () => {
  initAnimations();
  initTechIconsMotion();
});
