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

// reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// lightbox
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
