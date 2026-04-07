/**
 * gallery.js — Filter buttons and lightbox for the photo gallery
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---- Filter buttons ----
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      galleryItems.forEach((item) => {
        if (filter === "all" || item.dataset.stage === filter) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // ---- Lightbox ----
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCaption = document.getElementById("lightbox-caption");
  const lbClose = document.getElementById("lightbox-close");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return; // placeholder, no lightbox
      const caption = item.querySelector(".gallery-caption");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = caption ? caption.textContent : "";
      lightbox.classList.add("open");
    });
  });

  if (lbClose) {
    lbClose.addEventListener("click", () => lightbox.classList.remove("open"));
  }
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox && lightbox.classList.remove("open");
  });
});
