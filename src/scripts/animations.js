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
      tagName: "span",
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
      },
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

      heroTimeline.to(
        ".heroT",
        {
          x: dx,
          y: dy,
          scale: scaleRatio,
          ease: "power2.inOut",
        },
        0,
      );
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
        scrub: true,
      },
    });

    // Dùng JS để hiện section (CSS đã ẩn sẵn)
    aboutTextTimeline.to(aboutSection, { autoAlpha: 1, duration: 0.1 }, 0);
    aboutTextTimeline.to(splitText.words, {
      opacity: 1,
      y: 0,
      color: "rgb(255 255 255 / 1)",
      stagger: 0.15,
      ease: "none",
    }, 0);
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
      anticipatePin: 1,
    },
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
          end: start,
        },
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
          end: start + 1,
        },
      });
    });
  });
}
function initSkillsFlip() {
  const scene = document.querySelector(".skills-scene");
  const cards = gsap.utils.toArray(".skill-card");

  if (!scene || !cards.length) return;

  // Spread offsets: left, center, right (responsive)
  const getSpread = () => {
    if (window.innerWidth < 600) return 240;
    if (window.innerWidth < 900) return 300;
    return 370;
  };

  // Reset initial stacked transforms so GSAP owns the x axis
  gsap.set(cards[0], { transformOrigin: "center center" });
  gsap.set(cards[1], { transformOrigin: "center center" });
  gsap.set(cards[2], { transformOrigin: "center center" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: "top 65%",
      end: "bottom 20%",
      scrub: 1.8,
    },
  });

  // Phase 1 (0–50 %): spread cards horizontally
  tl.to(
    cards[0],
    { x: () => -getSpread(), ease: "power2.inOut", duration: 1 },
    0,
  );
  tl.to(cards[1], { x: 0, ease: "power2.inOut", duration: 1 }, 0);
  tl.to(
    cards[2],
    { x: () => getSpread(), ease: "power2.inOut", duration: 1 },
    0,
  );

  // Phase 2 (50–100 %): flip each card-inner to reveal back face
  tl.to(
    cards[0].querySelector(".skill-card-inner"),
    { rotateY: 180, ease: "power2.inOut", duration: 1 },
    0.6,
  );
  tl.to(
    cards[1].querySelector(".skill-card-inner"),
    { rotateY: 180, ease: "power2.inOut", duration: 1 },
    0.75,
  );
  tl.to(
    cards[2].querySelector(".skill-card-inner"),
    { rotateY: 180, ease: "power2.inOut", duration: 1 },
    0.9,
  );

  // Subtle y-lift on spread
  tl.to(cards[0], { y: 20, ease: "power2.inOut", duration: 1 }, 0);
  tl.to(cards[2], { y: 20, ease: "power2.inOut", duration: 1 }, 0);
}

function initSplineModal() {
  const modal = document.querySelector(".spline-modal");
  const projectsSection = document.querySelector(".projects-section");
  const projectsWrapper = document.querySelector(".projects-wrapper");
  // Section sau Projects (Tech)
  const techSection = projectsSection?.nextElementSibling;

  if (!modal || !projectsSection) return;

  const pos = () => {
    const W = modal.offsetWidth;
    const H = modal.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      hidden: { x: vw - W / 2, y: vh / 2 - H / 2, opacity: 0 }, // ngoài phải, ẩn
      right: { x: vw - W / 2, y: vh / 2 - H / 2, opacity: 1 }, // RIGHT 50%
      left: { x: -W / 2, y: vh / 2 - H / 2, opacity: 1 }, // LEFT 50%
      bottom: { x: vw / 2 - W / 2, y: vh - H / 2, opacity: 1 }, // BOTTOM 50%
    };
  };

  gsap.set(modal, pos().hidden);

  // Timeline 1: hidden → RIGHT, scrub đúng cùng lúc About text xuất hiện
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".about",
        start: "200% 50%", // khớp chính xác với animation text About
        end: "200% top",
        scrub: 1,
        onEnter: () => modal.classList.add("is-interactive"),
        onLeaveBack: () => modal.classList.remove("is-interactive"),
      },
    })
    .fromTo(modal, pos().hidden, { ...pos().right, ease: "power2.out" });

  // Timeline 2: RIGHT → LEFT, scrub theo toàn bộ horizontal scroll của Projects
  if (projectsWrapper) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: projectsSection,
          start: "top top",
          end: () => "+=" + projectsWrapper.scrollWidth,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      })
      .to(modal, { ...pos().left, ease: "power2.inOut" });
  }

  // Timeline 3: LEFT → BOTTOM, scrub khi Tech section vào view
  if (techSection) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: techSection,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.5,
        },
      })
      .to(modal, { ...pos().bottom, ease: "power2.inOut" });
  }
}

window.addEventListener("load", () => {
  initAnimations();
  initTechIconsMotion();
  initSkillsFlip();
  initSplineModal();
});
