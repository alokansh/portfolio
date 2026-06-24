const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const glow = document.querySelector(".cursor-glow");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

window.addEventListener("pointermove", (event) => {
  if (!glow) return;

  glow.style.transform = `translate3d(${event.clientX - 130}px, ${event.clientY - 130}px, 0)`;
});

document.querySelectorAll(".button, .contact-links a").forEach((link) => {
  link.addEventListener("pointerdown", () => link.classList.add("is-pressed"));
  link.addEventListener("pointerup", () => link.classList.remove("is-pressed"));
  link.addEventListener("pointerleave", () => link.classList.remove("is-pressed"));
});
