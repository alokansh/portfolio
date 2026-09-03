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

// Fallback: if reveal elements haven't shown after 500ms, force them visible
setTimeout(() => {
  revealElements.forEach((el) => {
    if (!el.classList.contains("is-visible")) {
      el.classList.add("is-visible");
    }
  });
}, 500);
// Burger menu
const navBurger = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");
if (navBurger && mobileMenu) {
  navBurger.addEventListener("click", () => {
    navBurger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navBurger.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });
}

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (nav) {
    if (window.scrollY > 80) {
      nav.style.borderColor = "rgba(15, 118, 110, 0.4)";
      nav.style.boxShadow = "0 4px 20px rgba(21, 21, 21, 0.06)";
    } else {
      nav.style.borderColor = "var(--line)";
      nav.style.boxShadow = "none";
    }
  }
}, { passive: true });

document.querySelectorAll(".button, .contact-links a").forEach((link) => {
  link.addEventListener("pointerdown", () => link.classList.add("is-pressed"));
  link.addEventListener("pointerup", () => link.classList.remove("is-pressed"));
  link.addEventListener("pointerleave", () => link.classList.remove("is-pressed"));
});
