const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function closeMenu() {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  nav.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 35);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

const vehicleSelect = document.querySelector("#vehicle");
document.querySelectorAll(".enquire-car").forEach(button => {
  button.addEventListener("click", () => {
    vehicleSelect.value = button.dataset.car;
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.querySelector("#name").focus({ preventScroll: true }), 550);
  });
});

const inquiryForm = document.querySelector("#inquiry-form");
inquiryForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;

  const formData = new FormData(inquiryForm);
  const details = [
    "Hello Luxury Wedding Cars By Dunith Perera,",
    "",
    "I'd like to enquire about wedding car rental.",
    "",
    `Name: ${formData.get("name") || "Not provided"}`,
    `Phone: ${formData.get("phone") || "Not provided"}`,
    `Wedding date: ${formData.get("date") || "Not decided yet"}`,
    `Preferred vehicle: ${formData.get("vehicle") || "Please advise"}`,
    `Wedding location: ${formData.get("location") || "Not provided"}`,
    `Additional details: ${formData.get("message") || "None"}`,
    "",
    "Please let me know about availability and a quotation. Thank you."
  ].join("\n");

  const whatsappUrl = `https://wa.me/94725199399?text=${encodeURIComponent(details)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeLightboxButton = lightbox.querySelector(".lightbox-close");
let lastFocusedElement = null;

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
  if (lastFocusedElement) lastFocusedElement.focus();
}
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lastFocusedElement = item;
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeLightboxButton.focus();
  });
});
closeLightboxButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});

document.querySelector("#year").textContent = new Date().getFullYear();
