function startCounter(startDate, prefix){
  const start = new Date(startDate).getTime();
  function update(){
    const now = Date.now();
    const diff = Math.max(0, now - start);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / (1000 * 60)) % 60);
    const sec = Math.floor((diff / 1000) % 60);
    document.getElementById(prefix + "-dias").textContent = days;
    document.getElementById(prefix + "-horas").textContent = hours;
    document.getElementById(prefix + "-min").textContent = min;
    document.getElementById(prefix + "-seg").textContent = sec;
  }
  update();
  setInterval(update, 1000);
}
startCounter("2025-04-29T00:00:00", "n");
startCounter("2024-12-27T00:00:00", "m");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.img;
    lightboxImg.alt = item.dataset.caption || "";
    lightboxCaption.textContent = item.dataset.caption || "";
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox(){
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

const intro = document.getElementById("intro");
const openSiteBtn = document.getElementById("openSiteBtn");
const musicToggle = document.getElementById("musicToggle");
const ytPlayer = document.getElementById("ytPlayer");
const videoId = "WRxwtV_x8nM";
let musicPlaying = false;

function startMusic(){
  ytPlayer.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&loop=1&playlist=" + videoId;
  musicPlaying = true;
  musicToggle.textContent = "🎵 Música do YouTube ativa";
}
function stopMusic(){
  ytPlayer.src = "";
  musicPlaying = false;
  musicToggle.textContent = "🎵 Tocar música";
}
openSiteBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  setTimeout(() => { intro.style.display = "none"; }, 550);
  startMusic();
});
musicToggle.addEventListener("click", () => {
  if (musicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});

const hearts = document.getElementById("hearts");
function createHeart(){
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.4 ? "❤" : "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 22) + "px";
  heart.style.animationDuration = (5 + Math.random() * 4) + "s";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 9500);
}
setInterval(createHeart, 450);
