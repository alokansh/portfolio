const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const inkTrail = document.querySelector(".ink-trail");
const handwrite = document.querySelector(".handwrite");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Reveal entries as they scroll into view */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);
revealElements.forEach((element) => revealObserver.observe(element));

/* Draw the cover heading by hand when it enters the viewport */
if (handwrite && !prefersReducedMotion) {
  const drawObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-drawn");
          drawObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  drawObserver.observe(handwrite);
} else if (handwrite) {
  handwrite.classList.add("is-drawn");
}

/* Scrollspy — highlight the current notebook section in the nav */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);
document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

/* Faint ink smudge follows the cursor (pointer devices only) */
if (inkTrail && !prefersReducedMotion) {
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    inkTrail.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  });
}

/* Pressed-state feedback on buttons and contact tabs */
document.querySelectorAll(".button, .contact-links a").forEach((link) => {
  link.addEventListener("pointerdown", () => link.classList.add("is-pressed"));
  link.addEventListener("pointerup", () => link.classList.remove("is-pressed"));
  link.addEventListener("pointerleave", () => link.classList.remove("is-pressed"));
});
