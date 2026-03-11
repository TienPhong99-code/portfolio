import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initAnimations = () => {
  // Hero Text Reveal
  const heroHeading = document.querySelector('.hero-heading');
  const heroSub = document.querySelector('.hero-subheading');

  if (heroHeading) {
    gsap.from(heroHeading, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 0.2
    });
  }

  if (heroSub) {
    gsap.from(heroSub, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });
  }

  // Fade Up Elements
  const fadeUpElements = document.querySelectorAll('.fade-up');
  fadeUpElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 0,
      opacity: 1,
      autoAlpha: 1,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  // Pinned Projects Section
  const pinnedSection = document.querySelector('.pinned-projects');
  if (pinnedSection) {
    ScrollTrigger.create({
      trigger: pinnedSection,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});
