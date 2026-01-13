/* =========================
   ELEMENTS
========================= */
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const carouselVp = document.querySelector("#carousel-vp");
const cCarouselInner = document.querySelector("#cCarousel-inner");
const indicatorsContainer = document.querySelector("#carouselIndicators");
const items = document.querySelectorAll(".cCarousel-item");

/* =========================
   STATE
========================= */
let ITEMS_PER_PAGE = getItemsPerPage();
let totalMovementSize = 0;
let currentIndex = 0;
let leftValue = 0;

/* =========================
   RESPONSIVE ITEMS PER PAGE
========================= */
function getItemsPerPage() {
  if (window.innerWidth <= 510) return 1; // mobile
  if (window.innerWidth <= 770) return 2; // tablet
  return 3; // desktop
}

/* =========================
   CALCULATE SIZES
========================= */
function calculateSizes() {
  const itemWidth = items[0].getBoundingClientRect().width;
  const gap = parseFloat(
    window.getComputedStyle(cCarouselInner).getPropertyValue("gap"),
    10
  );
  totalMovementSize = (itemWidth + gap) * ITEMS_PER_PAGE;
}

/* =========================
   BUILD DOTS
========================= */
function buildDots() {
  indicatorsContainer.innerHTML = "";
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    if (i === currentIndex) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentIndex = i;
      leftValue = -(totalMovementSize * i);
      cCarouselInner.style.left = leftValue + "px";
      updateIndicators();
    });

    indicatorsContainer.appendChild(dot);
  }
}

/* =========================
   UPDATE DOTS & ARROWS
========================= */
function updateIndicators() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
  updateArrowVisibility();
}

function updateArrowVisibility() {
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  if (prev) prev.classList.toggle("disabled", currentIndex === 0);
  if (next) next.classList.toggle("disabled", currentIndex >= totalPages - 1);
}

/* =========================
   ARROWS
========================= */
prev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    leftValue += totalMovementSize;
    cCarouselInner.style.left = leftValue + "px";
    updateIndicators();
  }
});

next.addEventListener("click", () => {
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  if (currentIndex < totalPages - 1) {
    currentIndex++;
    leftValue -= totalMovementSize;
    cCarouselInner.style.left = leftValue + "px";
    updateIndicators();
  }
});

/* =========================
   INIT
========================= */
function initCarousel() {
  ITEMS_PER_PAGE = getItemsPerPage();
  calculateSizes();
  buildDots();
  leftValue = -(totalMovementSize * currentIndex);
  cCarouselInner.style.left = leftValue + "px";
  updateArrowVisibility();
}

initCarousel();

/* =========================
   RESIZE HANDLER
========================= */
window.addEventListener("resize", () => {
  const oldItemsPerPage = ITEMS_PER_PAGE;
  ITEMS_PER_PAGE = getItemsPerPage();

  if (oldItemsPerPage !== ITEMS_PER_PAGE) {
    currentIndex = 0;
  }

  initCarousel();
});


let isDraggingPopular = false;
let dragStartXPopular = 0;
let dragStartLeftPopular = 0;

/* Popular Now swipe hint */
const popularHint = document.createElement("div");
popularHint.className = "swipe-hint";
carouselVp.style.position = carouselVp.style.position || "relative";
carouselVp.appendChild(popularHint);
let popularHintTimeout = null;

function showPopularHint(text, duration = 2500) {
  if (window.innerWidth > 510) return;
  popularHint.textContent = text;
  popularHint.style.opacity = "1";
  clearTimeout(popularHintTimeout);
  popularHintTimeout = setTimeout(() => (popularHint.style.opacity = "0"), duration);
}

function updatePopularHint() {
  if (window.innerWidth > 510) { popularHint.style.opacity = "0"; return; }
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  if (totalPages <= 1) { popularHint.style.opacity = "0"; return; }
  if (currentIndex === 0) showPopularHint("Swipe left");
  else if (currentIndex >= totalPages - 1) showPopularHint("Swipe right");
  else popularHint.style.opacity = "0";
}

function popularPointerDown(e) {
  if (window.innerWidth > 510) return; // only for mobile
  isDraggingPopular = true;
  dragStartXPopular = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  dragStartLeftPopular = leftValue; // current left value
  try { carouselVp.setPointerCapture && carouselVp.setPointerCapture(e.pointerId); } catch (_) {}
  e.preventDefault();
}

function popularPointerMove(e) {
  if (!isDraggingPopular) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const dx = x - dragStartXPopular;
  cCarouselInner.style.left = dragStartLeftPopular + dx + "px";
}

function popularPointerUp(e) {
  if (!isDraggingPopular) return;
  isDraggingPopular = false;
  const x = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
  const dx = x - dragStartXPopular;
  const threshold = totalMovementSize / 4;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  if (dx < -threshold && currentIndex < totalPages - 1) {
    currentIndex++;
  } else if (dx > threshold && currentIndex > 0) {
    currentIndex--;
  }

  leftValue = -(totalMovementSize * currentIndex);
  cCarouselInner.style.left = leftValue + "px";
  updateIndicators();
  updatePopularHint();
  try { carouselVp.releasePointerCapture && carouselVp.releasePointerCapture(e.pointerId); } catch (_) {}
}

carouselVp.addEventListener("pointerdown", popularPointerDown, { passive: false });
carouselVp.addEventListener("pointermove", popularPointerMove);
carouselVp.addEventListener("pointerup", popularPointerUp);
carouselVp.addEventListener("pointercancel", popularPointerUp);
carouselVp.addEventListener("touchstart", popularPointerDown, { passive: false });
carouselVp.addEventListener("touchmove", popularPointerMove, { passive: true });
carouselVp.addEventListener("touchend", popularPointerUp);
setTimeout(updatePopularHint, 400);

/* ==========================================================
   REUSABLE CAROUSEL FUNCTION WITH RESPONSIVE DESIGN
========================================================== */
function setupCarousel({
  prevBtn,
  nextBtn,
  viewport,
  inner,
  indicators,
  itemsPerPage = 3
}) {
  let currentPage = 0;
  let totalPages = 0;
  let pageWidth = 0;
  let currentItemsPerPage = 0;

  function getResponsiveItemsPerPage() {
    if (window.innerWidth <= 510) return 1;
    if (window.innerWidth <= 770) return 2;
    return itemsPerPage;
  }

  function calculate() {
    const item = inner.querySelector(".Carousel-item");
    if (!item) return;

    const gap = parseFloat(getComputedStyle(inner).gap) || 0;
    const itemWidth = item.getBoundingClientRect().width + gap;
    const ipp = getResponsiveItemsPerPage();

    pageWidth = itemWidth * ipp;
    totalPages = Math.ceil(inner.children.length / ipp);

    if (currentItemsPerPage !== ipp) {
      currentItemsPerPage = ipp;
      currentPage = 0;
    }

    createDots();
    moveToPage(currentPage);
    updateButtons();
    updateHint();
  }

  function createDots() {
    indicators.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");

      if (i === currentPage) dot.classList.add("active");

      dot.addEventListener("click", () => moveToPage(i));
      indicators.appendChild(dot);
    }
  }

  function moveToPage(page) {
    currentPage = Math.max(0, Math.min(page, totalPages - 1));
    const maxScroll =
      inner.scrollWidth - viewport.getBoundingClientRect().width;

    let target = -(currentPage * pageWidth);
    target = Math.max(-maxScroll, target);

    inner.style.left = target + "px";
    updateDots();
    updateButtons();
    updateHint();
  }

  /* Swipe hint element + helpers (mobile only) */
  const hintEl = document.createElement("div");
  hintEl.className = "swipe-hint";
  viewport.style.position = viewport.style.position || "relative";
  viewport.appendChild(hintEl);
  let hintTimeout = null;

  function showHint(text, duration = 2500) {
    if (window.innerWidth > 510) return;
    hintEl.textContent = text;
    hintEl.style.opacity = "1";
    hintEl.style.transform = "translateX(-50%) translateY(0)";
    clearTimeout(hintTimeout);
    hintTimeout = setTimeout(hideHint, duration);
  }

  function hideHint() {
    hintEl.style.opacity = "0";
    hintEl.style.transform = "translateX(-50%) translateY(6px)";
  }

  function updateHint() {
    if (window.innerWidth > 510) { hideHint(); return; }
    if (totalPages <= 1) { hideHint(); return; }
    if (currentPage === 0) {
      showHint("Swipe left");
    } else if (currentPage >= totalPages - 1) {
      showHint("Swipe right");
    } else {
      hideHint();
    }
  }

  /* ---------- Touch / Drag support (mobile only for menu2) ---------- */
  let isDragging = false;
  let dragStartX = 0;
  let dragStartLeft = 0;

  function onPointerDown(e) {
    // only enable drag for the menu2 or menu3 viewport on small screens
    if (!["carousel-vp2", "carousel-vp3"].includes(viewport.id) || window.innerWidth > 510) return;
    isDragging = true;
    dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartLeft = parseFloat(getComputedStyle(inner).left) || 0;
    viewport.setPointerCapture && viewport.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const dx = x - dragStartX;
    // apply drag visually (clamped loosely)
    inner.style.left = dragStartLeft + dx + "px";
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    const x = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
    const dx = x - dragStartX;
    const threshold = pageWidth / 4; // swipe threshold
    if (dx < -threshold && currentPage < totalPages - 1) {
      moveToPage(currentPage + 1);
    } else if (dx > threshold && currentPage > 0) {
      moveToPage(currentPage - 1);
    } else {
      moveToPage(currentPage); // snap back
    }
    try { viewport.releasePointerCapture && viewport.releasePointerCapture(e.pointerId); } catch (_) {}
  }

  // pointer events
  viewport.addEventListener("pointerdown", onPointerDown, { passive: false });
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", onPointerUp);
  viewport.addEventListener("pointercancel", onPointerUp);
  viewport.addEventListener("touchstart", onPointerDown, { passive: false });
  viewport.addEventListener("touchmove", onPointerMove, { passive: true });
  viewport.addEventListener("touchend", onPointerUp);

  function updateDots() {
    indicators.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPage);
    });
  }

  function updateButtons() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.classList.toggle("disabled", currentPage === 0);
    nextBtn.classList.toggle("disabled", currentPage >= totalPages - 1);
  }

  prevBtn.addEventListener("click", () => moveToPage(currentPage - 1));
  nextBtn.addEventListener("click", () => moveToPage(currentPage + 1));

  window.addEventListener("resize", calculate);
  calculate();

  // show a hint on first load if on mobile
  setTimeout(updateHint, 400);
}

/* =========================
   MENU 2 – COFFEE CAROUSEL
========================= */
setupCarousel({
  prevBtn: document.querySelector("#Carousel .arrow-left"),
  nextBtn: document.querySelector("#Carousel .arrow-right"),
  viewport: document.getElementById("carousel-vp2"),
  inner: document.getElementById("Carousel-inner"),
  indicators: document.getElementById("carouselIndicators2"),
  itemsPerPage: 4
});

/* =========================
   MENU 3 – FOOD CAROUSEL
========================= */
setupCarousel({
  prevBtn: document.getElementById("prev3"),
  nextBtn: document.getElementById("next3"),
  viewport: document.getElementById("carousel-vp3"),
  inner: document.getElementById("Carousel-inner3"),
  indicators: document.getElementById("carouselIndicators3"),
  itemsPerPage: 4
});

/* =========================
   NAV & MODAL
========================= */
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("close-modal");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", () => {
  modal.classList.add("open");
});
