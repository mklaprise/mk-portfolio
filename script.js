// ── TYPING ANIMATION ──
const words = ["filmmaker", "director", "DOP", "graphic designer", "storyteller"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typedEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 50 : 90;
  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 300;
  }
  setTimeout(type, speed);
}
type();

// ── WORK DROPDOWN ──
const workLink = document.querySelector('.nav-links a[href="#work"]');
const workMenu = document.getElementById("workMenu");

workLink.addEventListener("click", (e) => {
  e.preventDefault();
  workMenu.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!workMenu.contains(e.target) && !workLink.contains(e.target)) {
    workMenu.classList.remove("open");
  }
});

workMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => workMenu.classList.remove("open"));
});

// ── VIDEO OVERLAY ──
const overlay = document.getElementById("videoOverlay");
const overlayIframe = document.getElementById("overlayIframe");
const overlayClose = document.getElementById("overlayClose");

document.querySelectorAll(".project-info").forEach(info => {
  info.addEventListener("click", () => {
    const videoUrl = info.getAttribute("data-video");
    overlayIframe.src = videoUrl;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

overlayClose.addEventListener("click", closeOverlay);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeOverlay();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOverlay();
});

function closeOverlay() {
  overlay.classList.remove("open");
  overlayIframe.src = "";
  document.body.style.overflow = "";
}
